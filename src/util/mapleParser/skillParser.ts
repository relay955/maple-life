import type {SkillStat, SkillStats} from "./mapleStat";
import {HTMLElement as ParsedHtmlElement} from "node-html-parser";

export const parseSkills = (skillPageHtml:ParsedHtmlElement):SkillStats => {
    let skillList = skillPageHtml.querySelectorAll(".skill_0 > .skill_list li")!
    let skillInfoList:SkillStats = {}
    skillList.forEach(skillTag => {
        const name = skillTag.querySelector("h2")!.structuredText
        skillInfoList[name] = {
            name:name,
            imageUrl:skillTag.querySelector("h2 > img")?.getAttribute("src"),
            level:Number(skillTag.querySelector("thead > tr > th:nth-child(2)")!.structuredText.match(/\d+/)![0]),
        }
    })
    return skillInfoList;
}
