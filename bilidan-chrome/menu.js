// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
    biliUrl = info.linkUrl || info.pageUrl;
    var reg=new RegExp('(https|http)://([^\.]+)\.bilibili\.([^\.]+)/video/.+','i');
    var reg2=new RegExp('http(s)?://','i');
    var iftrue = reg.test(biliUrl);
    if(iftrue)
    {
        videoUrl = biliUrl.replace(reg2, "bilidan://url$1");
        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            chrome.tabs.update(tab.id, {url: videoUrl});
        });
    }
    else
    {
        alert('No');
    }
}
title = 'Play with mpv';
ref = ['page', 'link'];
for (i = 0, len = ref.length; i < len; i++) {
    context = ref[i];
    chrome.contextMenus.create({
        'title': title,
        'contexts': [context],
        'onclick': genericOnClick
    });
}
