let was_here=[]; //This array contains all the position already occupied

function maze_solver(maze, hat_pos){ //This function assert if the maze is solvable
    was_here=[];
    return recursiveSolve(0, 0, maze, hat_pos);  // 0,0 is the starting position
}


function recursiveSolve(y,x, maze, hat_pos){
    if (hat_pos.toString()===`${y},${x}`){//We arrived in the hat position. The maze is solvable
        return true;
    }
    if (maze[y][x]==='O' || was_here.includes(`${y},${x}`)){//The position is a hole or a previous position
        return false;
    }
    was_here.push(`${y},${x}`) //add the position in the preivosly walked path

    //Looking for the next move. Try to go in every direction
    //Move Up
    if (y!=0){//Check if on the top edge
        if(recursiveSolve(y-1,x, maze, hat_pos)){
            return true;
        }
    }//Move Down
    if (y!=maze.length-1){//Check if on the bottom edge
        if(recursiveSolve(y+1,x, maze, hat_pos)){
            return true;
        }
    }//Move Left
    if (x!=0){//Check if on the right edge
        if(recursiveSolve(y,x-1, maze, hat_pos)){
            return true;
        }
    }//Move Right
    if (x!=maze.length-1){//Check if on the right edge
        if(recursiveSolve(y,x+1, maze, hat_pos)){
            return true;
        }
    }
    return false;
}
module.exports= {maze_solver}