import React, { useState, useEffect, useRef } from 'react';
import './DraggablePanel.scss';
import {useSelector} from "react-redux";
import {RootState} from "@/types/types";

interface LayoutProps {
    children: React.ReactNode,
    onPositionSet: (boo:boolean) => void;
    onPosition: boolean,
    className: string,
}

const DraggablePanel: React.FC<LayoutProps> = ({ children, onPositionSet, onPosition, className}) => {

    const deviceCheck = useSelector((state:RootState) => state.browser.device);
    const targetRef = useRef(null);

    let currentPosition = 0;
    let interaction = { offset: 0, time: 0 };
    let gesture = { direction: '', position: 0, time: 0 };

    let startPosition = 0;
    let movePosition = 0;
    let endPosition = 0;
    let targetHeight = 0;

    const onStart = (e:any) => {
        let touches = e.touches;
        if (touches && touches.length > 1) return;
        e.preventDefault();

        if(targetRef.current){
            let pointerPosition = getPosition(e);
            startInteraction(pointerPosition);
            startGesture(pointerPosition, '');
            startPosition = pointerPosition;
            currentPosition = pointerPosition;

            const $target = targetRef.current as HTMLElement;
            $target.classList.add("is-active");
            targetHeight = $target.getBoundingClientRect().height;
            $target.style.transform = 'translateY(' + calcRelativePosition(pointerPosition) + '%)';

            if(deviceCheck !== 'PC'){
                window.addEventListener('touchend', onEnd);
                window.addEventListener('touchmove', onMove);
            }else{
                window.addEventListener('mouseup', onEnd);
                window.addEventListener('mousemove', onMove);
            }
        }
    }

    const onMove = (e:any) => {
        if(targetRef.current) {
            let pointerPosition = getPosition(e);
            movePosition = pointerPosition;
            let direction = pointerPosition < currentPosition ? "up" : "down";
            if (direction !== gesture.direction) {
                startGesture(pointerPosition, direction);
            }
            currentPosition = pointerPosition;
            const $target = targetRef.current as HTMLElement;
            $target.style.transform = 'translateY(' + calcRelativePosition(pointerPosition) + '%)';

        }
    }

    const onEnd = (e:any) => {
        if(targetRef.current) {
            let now = Date.now();
            let velocity = calcVelocity(gesture, {
                position: currentPosition,
                time: now,
            });
            let pointerPosition = getPosition(e);
            endPosition = pointerPosition;

            /*if (now - interaction.time < 100) {
                onPositionSet(! onPosition);
            } else */if (velocity > 0.05) {
                onPositionSet(gesture.direction === "up");
            } /*else {
                onPositionSet(currentPosition <= targetHeight / 2);
            }*/

            if(deviceCheck !== 'PC'){
                window.removeEventListener('touchend', onEnd);
                window.removeEventListener('touchmove', onMove);
            }else{
                window.removeEventListener('mouseup', onEnd);
                window.removeEventListener('mousemove', onMove);
            }

            const $target = targetRef.current as HTMLElement;
            $target.classList.remove("is-active");
            $target.style.transform = '';
            interaction = { offset: 0, time: 0 };
            gesture = { direction: '', position: 0, time: 0 };
        }
    }

    const startInteraction = (position:number) => {
        interaction = {
            offset: position,
            time: Date.now(),
        }
    };

    const startGesture = (position:number, direction:string) => {
        gesture = {
            direction: direction,
            position: position,
            time: Date.now(),
        }
    };

    const getPosition = (e:any) => {
        if (e.touches){
            if(e.touches.length > 0){
                return e.touches[0].clientY;
            }else if(e.changedTouches){
                return e.changedTouches[0].clientY;
            }
        }
    };

    const calcVelocity = (startGesture:any, endGesture:any) => {
        const distance = (100 / window.innerHeight) * (startGesture.position - endGesture.position);
        const time = endGesture.time - startGesture.time;
        return Math.abs(distance / time);
    };

    const calcRelativePosition = (position:number) => {
        let calc = (100 / targetHeight) * (position - interaction.offset);
        if(calc<0){
            calc = 0;
        }else if(calc > 100){
            calc = 100;
        }
        return calc;
    };


    return (
        <>
            <div className={`Panel js-panel ${className}`} ref={targetRef}>
                <div className={`Panel-toggle js-draggable`}
                     onMouseDown={(e)=> deviceCheck == 'PC' && onStart(e)}
                     onTouchStart={(e) => deviceCheck !== 'PC' && onStart(e)}
                ></div>
                {children}
            </div>
        </>
    );
}

export default DraggablePanel;