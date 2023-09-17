const {maze_solver}= require('./maze_solver')
function generateRandomField(){

    const hat = '^';
    const hole = 'O';
    const fieldCharacter = '░';
    const pathCharacter = '*';
    const tileOdds=70; //Odds that a random tile is a hole or a field tile
    const size = 4;
    let field= [];
    do{
        field=[];
        for (let j=0;j<size;j++){
            field.push([])
            for (let i=0;i<size;i++){
                field[j].push([])
                if(rand(100)<=tileOdds){
                    field[j][i]=hole;
                }else{
                    field[j][i]=fieldCharacter;
                }
            }
        }
        field[0][0]=pathCharacter;
        
        do {
            hat_pos=[rand(size), rand(size)]
        }while(hat_pos.toString()==='0,0')
        field[hat_pos[0]][hat_pos[1]]=hat;
    }while(!maze_solver(field, hat_pos)) 
    return field;
}

function rand(max){
    return Math.floor(Math.random()*max)
}

module.exports= {rand, generateRandomField}