import { createStore, combineReducers } from 'redux';
import {ScrollReducers} from "@/reducers/scrollReducers";
import {ProductReducers} from "@/reducers/productReducers";
import {CheckHeaderReducers} from "@/reducers/checkHeaderReducers";
import {DimmedReducers} from "@/reducers/dimmedReducers";
import {PopupReducers} from "@/reducers/popupReducers";
import {FireBaseReducers} from "@/reducers/fireBaseReducers";

const rootReducer = combineReducers({
    scroll: ScrollReducers,
    product: ProductReducers,
    check_header: CheckHeaderReducers,
    dimmed: DimmedReducers,
    popup: PopupReducers,
    firebase: FireBaseReducers,
});


// Redux 스토어 생성
const store = createStore(rootReducer);

export default store;