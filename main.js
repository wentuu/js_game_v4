const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-second-kick');

// Функція замикання для підрахунку та обмеження кількості кліків
const countClicks = (max = 6, elButton, defaultText) => {
    let counter = max;
    return () => {
        if (counter > 0) {
            counter--;
            console.log(`Кількість кліків, що залишилась для ${elButton.id}: ${counter}`);
            if (elButton) {
                elButton.innerText = `${defaultText} (${counter})`;
            }
        }
        
        if (counter === 0) {
            elButton.disabled = true;
            console.log(`Кнопка ${elButton.id} заблокована через вичерпання ліміту кліків!`);
        }
        return counter;
    };
};

// Створюємо замикання для кожної кнопки
const countBtn1 = countClicks(6, $btn, 'Thunder Jolt');
const countBtn2 = countClicks(6, $btn2, 'Super Attack');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    
    renderHP: function () {
        this.renderHPLife();
        this.renderProgressbarHP();
    },
    renderHPLife: function () {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    },
    renderProgressbarHP: function () {
        this.elProgressbar.style.width = `${this.damageHP}%`;
        
        const percent = (this.damageHP / this.defaultHP) * 100;
        if (percent < 60 && percent > 20) {
            this.elProgressbar.style.backgroundColor = 'orange';
        } else if (percent <= 20) {
            this.elProgressbar.style.backgroundColor = 'red';
        }
    },
    changeHP: function (count) {
        this.damageHP -= count;
        
        if (this.damageHP <= 0) {
            this.damageHP = 0;
            alert(`${this.name} проиграл бой!`);
            $btn.disabled = true;
            if ($btn2) $btn2.disabled = true;
        }

        this.renderHP();

        const $logs = document.querySelector('#logs');
        const logText = this === enemy ? generateLog(character, enemy, count) : generateLog(enemy, character, count);
        
        const $p = document.createElement('p');
        $p.innerText = logText;
        $logs.insertBefore($p, $logs.children[0]);
    }
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    
    renderHP: function () {
        this.renderHPLife();
        this.renderProgressbarHP();
    },
    renderHPLife: function () {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    },
    renderProgressbarHP: function () {
        this.elProgressbar.style.width = `${this.damageHP}%`;
        
        const percent = (this.damageHP / this.defaultHP) * 100;
        if (percent < 60 && percent > 20) {
            this.elProgressbar.style.backgroundColor = 'orange';
        } else if (percent <= 20) {
            this.elProgressbar.style.backgroundColor = 'red';
        }
    },
    changeHP: function (count) {
        this.damageHP -= count;
        
        if (this.damageHP <= 0) {
            this.damageHP = 0;
            alert(`${this.name} проиграл бой!`);
            $btn.disabled = true;
            if ($btn2) $btn2.disabled = true;
        }

        this.renderHP();

        const $logs = document.querySelector('#logs');
        const logText = this === enemy ? generateLog(character, enemy, count) : generateLog(enemy, character, count);
        
        const $p = document.createElement('p');
        $p.innerText = logText;
        $logs.insertBefore($p, $logs.children[0]);
    }
};

// Стрілочні функції замість звичайних там, де це можливо
const makeKick = (damageMin, damageMax) => {
    character.changeHP(random(damageMin));
    enemy.changeHP(random(damageMax));
};

$btn.addEventListener('click', () => {
    console.log('Kick 1');
    countBtn1(); // Виклик функції замикання для підрахунку та обмеження кліків
    makeKick(20, 20);
});

if ($btn2) {
    $btn2.addEventListener('click', () => {
        console.log('Kick 2 (Super Attack)');
        countBtn2(); // Виклик замикання для другої кнопки
        makeKick(35, 35);
    });
}

const init = () => {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
};

const random = (num) => Math.ceil(Math.random() * num);

const generateLog = (firstPerson, secondPerson, count) => {
    const { name: firstName } = firstPerson;
    const { name: secondName, damageHP, defaultHP } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} забылся, но в это время ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком противника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику. -${count}, [${damageHP}/${defaultHP}]`
    ];

    const randomNum = random(logs.length) - 1;
    return logs[randomNum];
};

init();