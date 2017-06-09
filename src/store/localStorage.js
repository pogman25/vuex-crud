export const loadState = () => {
    try{
        const serializeState = localStorage.getItem('vue-state');
        if(serializeState === null) {
            return undefined;
        }
        return JSON.parse(serializeState);
    } catch (err){
        return undefined;
    }
};

export const saveState = (state) => {
    try{
        const serializeState = JSON.stringify(state);
        localStorage.setItem('vue-state', serializeState);
    } catch (err){
        //ignore that
    }
};