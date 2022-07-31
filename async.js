// Using the querySelector method I got all the needed buttons
// based on their ids
const scanBtn = document.querySelector('#scan');
const scrambleBtn = document.querySelector('#scramble');
const solveBtn = document.querySelector('#solve');

// Using the querySelectorAll method I got all the cube sides
const cubes = document.querySelectorAll('.cube');

// Defining the function cubeReset used for resetting the cubes
// colors back to white, this is a temporary addition which might
// be removed later down the line
const cubeReset = () => {
    for(let i=0;i<cubes.length;i++)
    {
        const cubeBlocks = cubes[i].querySelectorAll('.cube-block');
        for(let j=0;j<cubeBlocks.length;j++)
        {
            cubeBlocks[j].style.backgroundColor='white';
        }
    }
}

// Adding event listeners for the click event to both buttons
// for scramble and solve, this is done temporarily so it's
// easier to reset everything while testing
scrambleBtn.addEventListener('click',cubeReset);
solveBtn.addEventListener('click',cubeReset);

// Defining an array of the colors we'll be using on the cube
const colorList = ['green','white','blue','red','yellow','orangered'];

// Defining the giveColorIndex functions which will take a json
// we received from an API, and take the 9 letters which represent
// colors and make a new array based on what color lies on what 
// index in the colorList array we defined above
// For example if the json gave us 'gggbbbrrr' the output array would
// be [0,0,0,2,2,2,3,3,3]
// This will be helpful to us later down the line
const giveColorIndex = (jsonColors) => {
    const colorIndex = [];

    for(let i=0;i<jsonColors.length;i++)
    {
        for(let j=0;j<colorList.length;j++)
        {
            if(jsonColors[i]===colorList[j][0])
            {
                colorIndex.push(j);
            }
        }
    }

    return colorIndex;
}

// Defining the colorCube function which will take as arguments
// the cube in question and the array colorIndex (provided by the
// function declared above), it will color each block of the cube
// side appropriately
const colorCube = (cube,colorIndex) => {
    const blocks = cube.children;

    for(let i=0;i<blocks.length;i++)
    {
        blocks[i].style.backgroundColor=colorList[colorIndex[i]];
    }
}

// Adding an event listener for the click event to the scan button
// this event will first disabled the other 2 buttons we have the 
// option to use, this is done so no errors can occur by sending
// other asynchronous events, after this we enter a for loop which
// will iterate 6 times (for each side of the cube) and each iteration
// it will use the fetch API to send a get request to the provided URL
// and get the needed json containing the colors of the cube sides, in
// case this fails an error will be outputted to the console
// After this we enter the if condition which if the error didn't
// occur will take the json's colors property and change it so it
// fits the format our two previously declared functions (giveColorIndex
// and colorCube) and then use it in order to call them and color
// 1 side of the cube
// Repeat this 5 more times and the entire cube is colored
// At the end the buttons which were disabled at the start are enabled again
scanBtn.addEventListener('click', async() => {

    scrambleBtn.setAttribute('disabled','true');
    solveBtn.setAttribute('disabled','true');

    for(let i=0;i<6;i++)
    {
        const json = await fetch('https://62e596abde23e2637921e0e5.mockapi.io/colors')
        .then( response => {
            if(response.ok)
            {
                return response.json();
            }
            return Promise.reject('An error occurred!');
        })
        .catch( error => {
            console.log('Error:',error);
        });

        if(json!==undefined)
        {
            let jsonColors = json['0']['colors'].toLowerCase();
            
            jsonColors = giveColorIndex(jsonColors);

            for(const cube of cubes)
            {
                colorCube(cube,jsonColors);
            }

        }
    }

    scrambleBtn.removeAttribute('disabled');
    solveBtn.removeAttribute('disabled');
});