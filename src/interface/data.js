let ShowData = {
    "conteiner" : [],
    "movement"  : [],
    "reports"   : []
}

let NotifyShowData = {
    "conteiner" : [],
    "movement"  : [],
    "reports"   : []
}

export function SetShowData(key, value){
    ShowData[key] = value;
    NotifyShowData[key].forEach(element => {
        element(value)
    });
}

export function GetShowData(key){
    return ShowData[key];
}

export function RegisterShowData(key, value){
    if(!NotifyShowData[key]){
        NotifyShowData[key] = [];
    }
    NotifyShowData[key].push(value);
}