/// <reference types="@sveltejs/kit" />
import {build, files, version } from '$service-worker';

self.addEventListener('install',e=>{
    console.log('install')
})

self.addEventListener('message',(e)=>{
    console.log(e.data)
})

