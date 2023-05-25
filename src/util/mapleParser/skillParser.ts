import type {SkillInfo} from "./mapleStat";
import {HTMLElement as ParsedHtmlElement} from "node-html-parser";

export const parseSkills = (skillPageHtml:ParsedHtmlElement):SkillInfo[] => {
    let skillList = skillPageHtml.querySelectorAll(".skill_0 > .skill_list li")!
    let skillInfoList:SkillInfo[] = []
    skillList.forEach(skillTag => {
        skillInfoList.push({
            name:skillTag.querySelector("h2")!.structuredText,
            imageUrl:skillTag.querySelector("h2 > img")?.getAttribute("src"),
            skillLevel:skillTag.querySelector("thead > tr > th:nth-child(2)")!.structuredText.match(/\d+/)![0],
        })
    })
    return skillInfoList;
}
