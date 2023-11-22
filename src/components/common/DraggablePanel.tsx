import React, { useState, useEffect, useRef } from 'react';
import './DraggablePanel.scss';
import { createPortal } from 'react-dom';

interface LayoutProps {
    children: React.ReactNode,
    onPositionSet: (boo:boolean) => void;
    onPosition: boolean,
    className: string,
}

const DraggablePanel: React.FC<LayoutProps> = ({ children, onPositionSet, onPosition, className}) => {

    const isMobileCheck = /Mobi|Android/i.test(navigator.userAgent);
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

            if(isMobileCheck){
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
            let pointerPosition = getPosition(e);
            endPosition = pointerPosition;

            let calcDistanceResult = calcDistance(gesture, {
                position: currentPosition,
                time: now,
            })
            if(calcDistanceResult >= 30){
                onPositionSet(gesture.direction === "up");
            }

            if(isMobileCheck){
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
        }else{
            return e.clientY;
        }
    };

    const calcDistance = (startGesture:any, endGesture:any) => {
        const distance = (100 / targetHeight) * (startGesture.position - endGesture.position);
        return Math.abs(distance);
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

    return createPortal(
        <>
            <div className={`Panel js-panel ${className}`} ref={targetRef}>
               <div className={`Panel-toggle js-draggable`}
                    onMouseDown={(e)=> !isMobileCheck && onStart(e)}
                    onTouchStart={(e) => isMobileCheck && onStart(e)}
               ></div>
               {children}
           </div>
        </>,
        document.body
    );
}

export default DraggablePanel;