/* Start of the top section javascript */

// Using the querySelector methods we find all the elements 
// we need for this section
const editBox = document.querySelector('main .edit-box');

const editBtn = editBox.querySelector('.btn.edit-btn');
const colorPicker = editBox.querySelector('.color-picker');
const colorBoxes = colorPicker.querySelector('.color-boxes');
const exitBtn = editBox.querySelector('.color-picker .btn.exit-btn');

// Using the querySelectorAll method I select all the color boxes
const colorBox = colorBoxes.querySelectorAll('.color-box');
const arrowDown = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/></svg>';

// Setting the default position of the down arrow
colorBox[0].innerHTML = arrowDown;

// Defining the functions animationDuration which will be
// used to set the animation duration for a passed specific
// element and time
const animationDuration = (element,time) =>  {
    element.style.animationDuration=time;
}

// Using the function animationDuration to set the animation
// duration for all the elements that will have animation
animationDuration(editBtn,'.5s');
animationDuration(exitBtn,'1s');
animationDuration(colorBoxes,'1s');

// Defining the function addClassList which will be
// used to set the given class to the given element
const addClassList = (element,className) => {
    element.classList.add(`${className}`);
}

// Using the function addClassList to set the given class
// to the given element that will need it
addClassList(editBtn,'animate__animated');
addClassList(exitBtn,'animate__animated');
addClassList(colorBoxes,'animate__animated');

// Using the querySelectorAll method I select all the color blocks of
// every cube
const cubeBlocks = document.querySelectorAll('.cube-block');

// Using a for each loop I took each cube block and added an event listener
// to it. The event listener is waiting for a click to happen while the edit
// button isn't displayed to change the background color of the clicked cube
// block to the selected color from the color box array of objects
cubeBlocks.forEach( cubeBlock => {
    cubeBlock.addEventListener('click' , () => {
        if(cubeBlock.style.cursor==='pointer')
        {
            for(item of colorBox)
            {
                if(item.innerHTML!=='')
                {
                    cubeBlock.style.backgroundColor=getComputedStyle(item).backgroundColor;
                    break;
                }
            }
        }
    });
});

// Defining the function blocksCursorOn which will apply the value
// 'pointer' to the style property cursor for each block, which will
// make the cursor look like it can click on the blocks
const blocksCursorOn = () => {
    cubeBlocks.forEach( cubeBlock => {
        cubeBlock.style.cursor='pointer';
    });
};

// Defining the function blocksCursorOff which will apply the value
// 'default' to the style property cursor for each block, which will
// make the cursor look like the default one for the browser, and
// make it look like that you clicking on the blocks does nothing
const blocksCursorOff = () => {
    cubeBlocks.forEach( cubeBlock => {
        cubeBlock.style.cursor='default';
    });
};

// Added an event listener that will trigger an animation
// when the element is clicked
editBtn.addEventListener('click' , () => {
    editBtn.classList.add('animate__fadeOutUp');
});

// Added an event listener that will trigger when the animation
// ends, depending on what was the previously performed animation
// it will enter an if or an else statement
editBtn.addEventListener('animationend' , () => {
    if(editBtn.classList.contains('animate__fadeOutUp')===true)
    {
        colorPicker.style.display='flex';
        
        editBtn.classList.remove('animate__fadeOutUp');
        editBtn.style.display='none';

        exitBtn.setAttribute('disabled','true');
        exitBtn.classList.add('animate__fadeInRight');
        colorBoxes.classList.add('animate__fadeInLeft');

        blocksCursorOn();
    }
    else
    {
        editBtn.classList.remove('animate__fadeInDown');
    }
})

// Added an event listener that will trigger animations
// when the element is clicked
exitBtn.addEventListener('click' , () => {
    exitBtn.classList.add('animate__fadeOutRight');
    colorBoxes.classList.add('animate__fadeOutLeft');
});

// Added an event listener that will trigger when the animation
// ends, depending on what was the previously performed animation
// it will enter an if or an else statement
exitBtn.addEventListener('animationend', () => {
    if(exitBtn.classList.contains('animate__fadeInRight')===true)
    {
        exitBtn.classList.remove('animate__fadeInRight');
        colorBoxes.classList.remove('animate__fadeInLeft');
        exitBtn.removeAttribute('disabled');
    }
    else
    {
        exitBtn.classList.remove('animate__fadeOutRight');
        colorBoxes.classList.remove('animate__fadeOutLeft');

        colorPicker.style.display='none';

        editBtn.style.display='inline-block';
        editBtn.classList.add('animate__fadeInDown');

        blocksCursorOff();
    }
});

// Defining the function removeHTML which removes all the content
// of the innerHTML property from within every member of a list 
// of elements
const removeHTML = elementList => {
    elementList.forEach( element => {
        element.innerHTML='';
    });
}

// Adding an event listener to each color box that responds when
// it is clicked, it will first call the removeHTML function so 
// that the arrow down icon is remove from every item, and then it
// will add it to the clicked element, this is also going to ensure
// that the arrow down icon doesn't reset unless the page does
colorBox.forEach( element => {
    element.addEventListener('click', () => {
        removeHTML(colorBox);
        element.innerHTML=arrowDown;
    });
});

/* End of the top section javascript */