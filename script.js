// // #########################################################################################

 let winnier_checker = (function(){
    const box1 =document.querySelector('div[box-number="1"]');
    const box2 =document.querySelector('div[box-number="2"]');
    const box3 =document.querySelector('div[box-number="3"]');
    const box4 =document.querySelector('div[box-number="4"]');
    const box5 =document.querySelector('div[box-number="5"]');
    const box6 =document.querySelector('div[box-number="6"]');
    const box7 =document.querySelector('div[box-number="7"]');
    const box8 =document.querySelector('div[box-number="8"]');
    const box9 =document.querySelector('div[box-number="9"]');
    

    const rows = [[box1 , box2,box3] , [box4 , box5,box6],[box7 , box8 , box9]];
    const columns=[[box1 , box4,box7] , [box2 , box5,box8],[box3 , box6 , box9]];
    const diagonals = [[box1 , box5 ,box9] , [box3 , box5 , box7]];

    const check_row =function(){
        let check = false;
        let winner;
        let winning_row;
        for(let i = 1 ; i<=3;i++){
            const row = rows[i-1];
            if(row[0].classList.contains('x') &&row[1].classList.contains('x') &&row[2].classList.contains('x')){
                check = true;
                winner = 'x';
                winning_row=row;
            }
            if(row[0].classList.contains('o') &&row[1].classList.contains('o') &&row[2].classList.contains('o')){
                check = true;
                winner = 'o';
                winning_row=row;
            }
        }
        if(check===true){
            return {check , winner , winning_row };
        }
        return {check};
    }

    const check_column =function(){
        let check = false;
        let winner;
        let winning_column;
        for(let i = 1 ; i<=3;i++){
            const column = columns[i-1];
            if(column[0].classList.contains('x') &&column[1].classList.contains('x') &&column[2].classList.contains('x')){
                check = true;
                winner = 'x';
                winning_column=column;
            }
            if(column[0].classList.contains('o') &&column[1].classList.contains('o') &&column[2].classList.contains('o')){
                check = true;
                winner = 'o';
                winning_column=column;
            }
        }
        if(check===true){
            return {check , winner , winning_column };
        }
        return {check};
    }

    const check_diagonal =function(){
        let check = false;
        let winner;
        let winning_diagonal;
        for(let i = 1 ; i<=2;i++){
            const diagonal = diagonals[i-1];
            if(diagonal[0].classList.contains('x') &&diagonal[1].classList.contains('x')&&diagonal[2].classList.contains('x')){
                check = true;
                winner = 'x';
                winning_diagonal=diagonal;
            }
            if(diagonal[0].classList.contains('o') &&diagonal[1].classList.contains('o')&&diagonal[2].classList.contains('o')){
                check = true;
                winner = 'o';
                winning_diagonal=diagonal;
            }
        }
        if(check===true){
            return {check , winner , winning_diagonal};
        }
        return {check};
    }

    const check_winning=function(){
        let check_r = check_row();
        let check_c = check_column();
        let check_d = check_diagonal();
        if(check_r.check === true){
            game_manager.stop_the_game();
            (check_r.winning_row).forEach(function(box){
                box.classList.add('winner');
            });
           alert( check_r.winner +' wins ');
        }

        if(check_c.check === true){
            game_manager.stop_the_game();
            (check_c.winning_column).forEach(function(box){
                box.classList.add('winner');
            });
           alert( check_c.winner +' wins ');
        }
        
        if(check_d.check === true){
            game_manager.stop_the_game();
            (check_d.winning_diagonal).forEach(function(box){
                box.classList.add('winner');
            });
           alert( check_d.winner +' wins ');
        }
    };

    return{check_winning}
}());


// #########################################################################################





// #########################################################################################



let game_manager = (function(){
    
    let turn = 'X';
    let player1 = document.querySelector('div.player1');
    let player2 = document.querySelector('div.player2');
    const boxes = document.querySelectorAll('.box');
    let game_running =true;

    const run_the_game =function(){
       
        function runner(box){

            const turn_swipper = function(){
                if(game_running  &&!box.classList.contains('x') && !box.classList.contains('o')){
                    if(turn==='X'){
                        // the toggle functionality above
                        player1.classList.remove('active');
                        player2.classList.add('active');
                        
                        box.textContent = turn;
                        box.classList.add('x');
                        turn = 'O';
                    }else if(turn === 'O' ) {
                        // the toggle functionality above
                    player2.classList.remove('active');
                    player1.classList.add('active');
                    
                    box.textContent = turn;
                    box.classList.add('o');
                    turn = 'X';
                }
            }                
            
            winnier_checker.check_winning();
        }
        box.addEventListener('click',turn_swipper);
}
        boxes.forEach(runner);
    }



    const stop_the_game = function(box){
        game_running=false;
    }
    

    return {run_the_game , stop_the_game}
    
    
})(); 


// #########################################################################################

game_manager.run_the_game();