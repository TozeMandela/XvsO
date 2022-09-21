((win, doc)=>
    {
        let $h1 = doc.getElementById('welcome');
        let exist = true;
        let $btnJogar = doc.querySelector('.btnJogar');
        let $selectPlayer = doc.querySelector('select[name=players]');
        let idClearInterval;
        let arr = new Array();
        let isVSplayer = false;
        let haveSound = true;
        let musica = doc.querySelector('audio');
        let soundIcon = doc.querySelector('.activ img')||'';

        itsPlaying(haveSound,musica);

        soundIcon.addEventListener('click', ()=>{
           itsPlaying(haveSound,musica); 
        })

        localStorage.setItem('data',JSON.stringify([]));
        localStorage.setItem('pX',JSON.stringify(null));
        localStorage.setItem('pO',JSON.stringify(null));
                
        idClearInterval = setInterval(() => {
            if(exist){
                $h1.innerHTML = 'welcome in game x/O';
                exist = false;
            }else{
                $h1.innerHTML = `<bdo dir="rtl">welcome in game x/O</bdo>`;
                exist = true; 
            }
        }, 1000);      

        $selectPlayer.addEventListener('change', ()=>{
            doc.querySelector('select[name=levels]').style.display = "none";
            doc.querySelector('.label').style.display = "none";
            doc.querySelector('.insertName').innerHTML = `desejas inserir nomes?`;

            isVSplayer = true;
        });

        if($btnJogar){
            $btnJogar.addEventListener('click', ()=>{
                
                clearInterval(idClearInterval);

                let teste = doc.querySelectorAll('select');
                teste.forEach(el=>{
                    arr.push(el.value);
                });
                
                if(isVSplayer) arr.pop();
                arr.push(arr[1]);
                localStorage.setItem('data',JSON.stringify(arr));
                win.location.href='../src/jogo.html';
            })
        } 
        /* add sounds */
        function itsPlaying(control, sound) {
            if(control){
                sound.pause();
                soundIcon.src = '../audio/icone/no-son.png';
                haveSound = false;
            }else{
                sound.play();
                soundIcon.src = '../audio/icone/sons.png';
                haveSound = true;
            }
        }

    })(window, document)