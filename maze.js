const prompt = require('prompt-sync')({sigint: true});
const { generateRandomField, rand }=require('./new_field.js')
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field {
  constructor(){
    this.state=generateRandomField();
    this.character=[0, 0];
  }
  print(){ //Print current state
    const state_formatted=this.state.map((line)=>line.join(''))//Create current state without commas
    console.log(state_formatted.join('\n'))//Print correctly formatted state
  }
};

const myField = new Field();
//Opening Message
console.log("Welcome! Use 'u', 'd', 'r' or 'l' to move your character (*) and help him retrieve his hat (^)!")
console.log("Beware! Don't fall in the holes (O), use an available space (░) to move! ")
console.log("Write 'quit' to exit.")
myField.print()

//Game Logic
while(true){
    const move = prompt('Which way? ');
    const old_pos_y= myField.character[0];
    const old_pos_x= myField.character[1];
    //Checking the input
    switch(move){
        case 'u':
            if(check_bounds(old_pos_y, 0)){
                break;
            };
            const new_pos_u= [old_pos_y-1, old_pos_x];
            movement(myField.character, new_pos_u);
            break;
        case 'd':
            if(check_bounds(old_pos_y, myField.state.length-1)){
                break;
            };
            const new_pos_d= [old_pos_y+1, old_pos_x];
            movement(myField.character, new_pos_d);
            break;
        case 'r':
            if(check_bounds(old_pos_x, myField.state[0].length-1)){
                break;
            };
            const new_pos_r= [old_pos_y, old_pos_x+1];
            movement(myField.character, new_pos_r);
            break;
        case 'l':
            if(check_bounds(old_pos_x, 0)){
                break;
            };
            const new_pos_l= [old_pos_y, old_pos_x-1];
            movement(myField.character, new_pos_l);
            break;
        case 'quit':
            console.log('Quitting the game...')
            process.exit()
        default:
            console.log('Invalid input, try again.')
    };
}


function movement(old_pos, new_pos){
    const element= myField.state[new_pos[0]][new_pos[1]]
    switch(element){
        case hat:
            console.log('You found the hat! You win!');
            process.exit()
        case hole:
            console.log('You fell in the hole! You lose!');
            process.exit()
        case fieldCharacter:
            myField.character=new_pos
            myField.state[old_pos[0]][old_pos[1]]=fieldCharacter;
            myField.state[new_pos[0]][new_pos[1]]=pathCharacter;
            myField.print()
            break;
    }
}


function check_bounds(pos, bound){
    if (pos===bound){
        console.log('Invalid move, try again.')
        return 1
    }
    return 0
}