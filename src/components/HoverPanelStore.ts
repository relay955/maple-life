import { writable } from "svelte/store";

interface hoverPanelState{
    width:number,
    title:string,
    description:string,
    x:number,
    y:number,
    isVisible:boolean
}

const createHoverPanelState = () => {
    const {subscribe, set} = writable<hoverPanelState>({
        title:"", description:"",
        x:0, y:0, width:300,
        isVisible:false
    });

    return {
        subscribe,
        show:(title:string,description:string,x:number,y:number,width:number=300) => set({
            title:title, description:description,
            x:x, y:y, width:width,
            isVisible:true
        }),
        hide:() => set({ title:"", description:"", x:0, y:0, width:300, isVisible:false })
     }
}

export const hoverPanelState = createHoverPanelState();