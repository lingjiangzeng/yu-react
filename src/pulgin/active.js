
const active = (event) => {
  if (event.buttons != 1) {
    return;
  }
  let el = event.currentTarget;
  if (el.querySelectorAll('.activemodel').length > 4) {
    return;
  }
  let offset = el.getBoundingClientRect();
  let width = el.offsetWidth;
  let height = el.offsetHeight;
  let hypotenuse = Math.ceil(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)));
  let left = event.clientX - offset.x; 
  let top = event.clientY - offset.y;

  let div = document.createElement('div');
  div.classList.add('activemodel');
  div.style.transformOrigin = '50% 50%';
  div.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0s';
  div.style.borderRadius = '50%';
  div.style.position = 'absolute';
  div.style.width = '1px';
  div.style.height = '1px';
  div.style.background = 'rgba(0,0,0,0.06)';
  div.style.top = `${top}px`;
  div.style.left = `${left}px`;

  let callback = () => {
    let setTime = null;
    setTime = setTimeout(() => {
      div.style.background = 'rgba(0,0,0,0.2)';
      div.style.transform = `scale(${hypotenuse * 2})`;
      clearTimeout(setTime);
    });
    observer.disconnect();
    observer = null;
  };
  let observer = new MutationObserver(callback);
  observer.observe(el, { childList: true });

  let mouseupfun = () => {
    let setTime1 = null;
    let setTime2 =  null;
    setTime1 = setTimeout(() => {
      div.style.transition = 'all 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0s';
      div.style.background = 'rgba(0,0,0,0)';
      setTime2 = setTimeout(() => {
        if (el.contains(div)) {
          el.removeChild(div);
        };
        clearTimeout(setTime2);
      }, 700);
    clearTimeout(setTime1);
    }, 400)
  };

  let mouseleavefun = () => {
    el.removeEventListener('mouseleave', mouseleavefun);
    el.removeEventListener('mouseup', mouseupfun);
    let setTime1 = null;
    let setTime2 =  null;
    setTime1 = setTimeout(() => {
      div.style.transition = 'all 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0s';
      div.style.background = 'rgba(0,0,0,0)';
      setTime2 = setTimeout(() => {
        if (el.contains(div)) {
          el.removeChild(div);
        };
        clearTimeout(setTime2);
      }, 700);
      clearTimeout(setTime1);
    }, 400)
  }

  el.addEventListener('mouseup', mouseupfun);

  el.addEventListener('mouseleave', mouseleavefun);
  
  el.appendChild(div);
}

export default active;