# PointerObserver.js
Observe mouse and touches

## Ussage

```js
import {PointerObserver} from "../PointerObserver.js";
new PointerObserver(el).onmove = function(e){
    console.log(this.pos);
}
```

```html
<div id=el style="position:absolute;">
    StartObserving
</div>
```

[doc](https://doc.deno.land/https://cdn.jsdelivr.net/gh/u1ui/PointerObserver.js@1.0.0/PointerObserver.js)

## Install

```js
import {PointerObserver} from "https://cdn.jsdelivr.net/gh/u1ui/PointerObserver.js@1.0.0/PointerObserver.min.js"
```

## Demos

[minimal.html](http://gcdn.li/u1ui/PointerObserver.js@main/tests/minimal.html)  
[test.html](http://gcdn.li/u1ui/PointerObserver.js@main/tests/test.html)  

## About

- MIT License, Copyright (c) 2022 <u1> (like all repositories in this organization) <br>
- Suggestions, ideas, finding bugs and making pull requests make us very happy. ♥

