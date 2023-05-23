import {invoke} from "@tauri-apps/api";
import {PROXY_URL} from "../config";
import axios from "axios";

/** 현재 웹이 타우리에서 실행되고있는지, 아니면 일반 크롬/엣지 브라우저인지 판단합니다. */
export const isOnTauri = () => {
    //@ts-ignore
    return window.__TAURI__ !== undefined
}

export const requestWithProxy = async (url: string,is_xml:boolean = false):Promise<string> => {
    if (isOnTauri()) {
        console.log("tauri detected.")
        return await invoke<string>("request_with_proxy", {url: url})
    } else {
        if(is_xml) throw new Error("xml request is not supported in browser");
        const urlWithProxy = `${PROXY_URL}/${url}`
        return (await axios.get<string>(urlWithProxy)).data
    }
}
