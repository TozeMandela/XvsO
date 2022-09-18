((win, doc)=>{
    let data = JSON.parse(localStorage.getItem('data'));
    let $campos = doc.querySelectorAll('.principal div');
    let $imgIndicador = doc.querySelector('.indicador img');
    let paleta = firstToGo(data[2]);
    let jogadas = [['1','2','3'],['4','5','6'],['7','8','9']];

    if(win.innerHeight<675){
        $campos.forEach(el => {
            el.style.height='130px';
            el.style.lineHeight='115px';
        });
        doc.querySelector('.win').style.height='390px';
        doc.querySelector('.win').style.lineHeight='375px'
    }

    addPlayer(data);
    buttonClick();

    $campos.forEach(el => {
        el.addEventListener('click', ()=>{
            addValues(el,jogadas,JSON.parse(el.dataset.id),paleta);
            quemComeca();
            vencedor();

        });
    });
    /* dita o vencedor */
    function vencedor(){
        if(isWin('X')){
            addPontoView('X', '.pontoX', '.pontoO');
            doc.querySelector('.principal1').style.display = 'block';
            
            doc.querySelector('.venceu').innerHTML = 'jogador X';
            setInterval(() => {
                win.location.reload();
            }, 6000);
        };

        if(isWin('O')){
            addPontoView('O', '.pontoX', '.pontoO');
            doc.querySelector('.principal1').style.display = 'block';
            doc.querySelector('.venceu').innerHTML = 'jogador O';
            setInterval(() => {
                win.location.reload();
            }, 6000);
        };
    }
    /* add values na matriz and n,pos,valuea div */
    function addValues(el, Matrix,pos,paleta){
        if(el.innerHTML== '\n                    \n                '||el.innerHTML=='\n                '){

            preencherArrey(Matrix,pos,paleta[paleta.length-1]);

            el.style.backgroundColor = '#89E0FA';
            el.style.border = '1px solid black';
            el.innerHTML = `${paleta.pop()}`;
        }
    }
    /* percorrer div */
    function percorerDiv(p){
        $campos.forEach(el => {
            if(el.className.replace(/\w\d /gi,'')==p){
                addValues(el,jogadas,JSON.parse(el.dataset.id), paleta);
                quemComeca();
                vencedor();
            }
        }); 
    }
/* eventos teclado */
    function buttonClick(){
        doc.addEventListener('keydown',(evt)=>{
            percorerDiv(evt.key);
        })
    } 
    function addPontoView(v, class1, class2){
        let pontoSave;
        if(data[1]==v){
            let pontoX = doc.querySelector(class1);
            pontoX.innerHTML = `${parseInt(pontoX.innerHTML)+1}`;
            pontoSave = pontoX.innerHTML;
        }else{
            let pontoX = doc.querySelector(class2);
            pontoX.innerHTML = `${parseInt(pontoX.innerHTML)+1}`;
            pontoSave = pontoX.innerHTML;
        }
        localStorage.setItem(`p${v}`, JSON.stringify(pontoSave));
    } 

/* indica para o lado de quem é a vez de jogar */
    setInterval(function Vezde(){
        if(paleta[paleta.length-1] === data[1]){
            $imgIndicador.src = '../assets/indicador/mE.png';
        }else{
            $imgIndicador.src = '../assets/indicador/mD.png';
        }
        updatePts();

    }, 200);

/* quem ira começar na proximo jogo */
    function quemComeca(){
        
        if(paleta.length==0){ 
            if(data[2]=='X'){
                data[2]='O';
            }else if(data[2]=='O'){
                data[2]='X';
            };
            let pontoX = doc.querySelector('.empate');
            pontoX.innerHTML = `${parseInt(pontoX.innerHTML)+1}`;
            localStorage.setItem('emapte',pontoX.innerHTML);
            localStorage.setItem('data',JSON.stringify(data));
            
            return win.location.reload();
        }

    }

/* add se o primeiro jogador estará a usar o X ou o bola */
function addPlayer (data){
    switch (data.length) {
        case 3:
            doc.querySelector('.col2 p').innerHTML = `player ${data[1]}` ;
            if(data[1]=='X'){
                doc.querySelector('.col4 p').innerHTML = `player O` ;

            }else{
                doc.querySelector('.col4 p').innerHTML = `player X` ;
            }
            break;
    
        case 4    :

            break;
    }
}
/* dá a paleta inicial do jogo */
    function firstToGo(p){
        if(p=='X') return ['X','O','X','O','X','O','X','O','X'];

        if(p=='O') return ['O','X','O','X','O','X','O','X','O'];
    }

    /* preenchendo o array de comparações */
    function preencherArrey(arr, posicao, value){
        arr[posicao[0]][posicao[1]] = value;
    }

    function colorarDivWin(p){
        let aux = p;
            $campos.forEach(el => {
                if(el.className.replace(/\w\d /gi,'')==p[0] ||
                el.className.replace(/\w\d /gi,'')==p[1] || el.className.replace(/\w\d /gi,'')==p[2]){
                    el.style.backgroundColor = '#3AF00C';
                }
            });
    }
    /* verifica se venceu */
    function isWin(comp){

        if(jogadas[0][0]==comp && jogadas[0][1]==comp && jogadas[0][2]==comp){
            colorarDivWin(['1','2','3']);
          
            console.log('vvvvvvvv')
            return true;
        }

        if(jogadas[0][0]==comp && jogadas[1][1]==comp && jogadas[2][2]==comp){
            colorarDivWin(['1','5','9']);
            console.log('vvvvvvvv')
            
            return true;
        }

        if(jogadas[0][0]==comp && jogadas[1][0]==comp && jogadas[2][0]==comp){
            colorarDivWin(['1','4','7']);
            console.log('vvvvvvvv')

            return true;
        }/* 
'------------------------------------------------' */
        if(jogadas[0][1]==comp && jogadas[1][1]==comp && jogadas[2][1]==comp){
            colorarDivWin(['5','2','8']);
            console.log('vvvvvvvv')
            
            return true;
        }

        if(jogadas[0][2]==comp && jogadas[1][1]==comp && jogadas[2][0]==comp){
            colorarDivWin(['3','5','7']);
            console.log('vvvvvvvv')

            return true;
        }

        if(jogadas[1][0]==comp && jogadas[1][1]==comp && jogadas[1][2]==comp){
            colorarDivWin(['4','5','6']);
            console.log('vvvvvvvv')

            return true;
        }
        if(jogadas[2][0]==comp && jogadas[2][1]==comp && jogadas[2][2]==comp){
            colorarDivWin(['7','8','9']);
            console.log('vvvvvvvv')

            return true;
        }
        if(jogadas[2][2]==comp && jogadas[1][2]==comp && jogadas[0][2]==comp){
            colorarDivWin(['6','3','9']);
            console.log('vvvvvvvv')

            return true;
        }
    }

    function updatePts() {
        doc.querySelector('.empate').innerHTML = `${JSON.parse(localStorage.getItem('emapte'))||'00'}`;
        if(data[1]=='X'){
            doc.querySelector('.pontoX').innerHTML = `${JSON.parse(localStorage.getItem('pX'))||'00'}`;
        }else{        
            doc.querySelector('.pontoO').innerHTML = `${JSON.parse(localStorage.getItem('pX'))||'00'}`;
        }

        if(data[1]=='O'){
            doc.querySelector('.pontoX').innerHTML = `${JSON.parse(localStorage.getItem('pO'))||'00'}`;
        }else{        
            doc.querySelector('.pontoO').innerHTML = `${JSON.parse(localStorage.getItem('pO'))||'00'}`;
        }
        
    }
})(window, document);