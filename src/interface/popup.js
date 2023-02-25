const ModalState = {
    popUpRegister : false,
    popUpMovement : false
};

const ModalData = {
    popUpRegister : [],
    popUpMovement : []
}

const NotifyModalObserver = {
    popUpRegister : [],
    popUpMovement : []
}

const NotifyModalData = {
    popUpRegister : [],
    popUpMovement : []
}

// ModalData
export function SetModalData(modal, data){
    ModalData[modal] = data;
    NotifyModalData[modal].forEach(element => {
        element(data);
    });
}
export function GetModalData(key, value){
    return ModalData[key][value];
}
export function RegisterModalData(modal, func){
    NotifyModalData[modal].push(func);
}

// ModalState
export function SetModalState(modal, state){
    ModalState[modal] = state;
    NotifyModalObserver[modal].forEach(element => {
        element(state);
    });
}
export function GetModalState(key, value){
    return ModalState[key][value];
}
export function RegisterModalObserver(modal, func){
    NotifyModalObserver[modal].push(func);
}
