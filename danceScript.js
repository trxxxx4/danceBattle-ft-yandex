
// Базовый класс героя
class Hero {
    // Конструктор базового класса
    constructor(name, level, healthPoints, stats) {
        this.name = name; // Имя
        this.level = level; // Уровень
        this.healthPoints = healthPoints; // Жизненные силы
        this.stats = stats; // Параметры
    }

    // Метод, отвечающий за вывод информации о герое в консоль
    displayHero() {
        const heroInfo =
            `Имя: ${this.name}` +
            `\nУровень: ${this.level}` +
            `\nЖизненные силы: ${this.healthPoints}` +
            `\nСила: ${this.stats.str}` +
            `\nИнтеллект: ${this.stats.int}` +
            `\nЛовкость: ${this.stats.agi}`;

        console.log(heroInfo);
    }
}

// Дочерний класс героя-мага
class Mage extends Hero {
    // Конструктор дочернего класса
    constructor(name, level, healthPoints, stats, hasTectonicPotion, mana) {
        super(name, level, healthPoints, stats);
        this.hasTectonicPotion = hasTectonicPotion; // Зелье для тектоника
        this.mana = mana; // Мана мага
    }

    // Метод, расширяющий метод базового класса
    displayHero() {
        super.displayHero();
        //......................................................|
        //......................................................x
        console.log(`Мана: ${this.mana}`);

        if (this.hasTectonicPotion === "true") {
            console.log("Есть зелье для тектоника");
            this.stats.int += Number(this.mana);
            console.log(`С учётом маны у нашего волшебника ${this.stats.int} единиц интелекта`);
        }
    }
}

// Дочерний класс героя-рыцаря
class Knight extends Hero {
    // Конструктор дочернего класса
    constructor(name, level, healthPoints, stats, isHorseTango, energy) {
        super(name, level, healthPoints, stats);
        this.isHorseTango = isHorseTango; // Может танцевать танго на коне

        // Показатель усталостии героя,
        // где 1 - герой не устал, gameParameters.MAX_STAT - герой устал и не может делиться защитой
        this.energy = energy;
    }

    // Метод, расширяющий метод базового класса
    displayHero() {
        super.displayHero();
        //......................................................|
        //......................................................x
        console.log(`Энергия: ${this.energy}`);

        if (this.isHorseTango === "true") {
            
            console.log("Этот герой может танцевать танго на коне");
            this.stats.agi += Number(this.energy);
            console.log(`С учётом маны у нашего волшебника ${this.stats.agi} единиц ловкости`);
            
        }
    }
}

//Тут у меня стык уроков

// Объект с настройками игры
const gameParameters = {
    MAX_LEVEL: 10, //Максимальный уровень героя
    MAX_STAT: 99, //Минимальный уровень параметра героя
    MIN_STAT: 10, //Минимальный уровень параметра для умения
}

// Объект классов игры
const gameClasses = {
    Mage: "Маг",
    Knight: "Рыцарь",
    Hero: "Класс"
}
// Объявление героя игрока
let playerHero = null;

// Объявление героя оппонента
let enemyHero = null;
// Добавление героя игрока на экран
const sendToBattleButton = document.getElementById("sendToBattleButton");
// Вывод героя оппонента на экран
const getEnemyButton = document.getElementById("getEnemyButton");


// Действие героя игрока
const doSkillButton = document.getElementById("doSkillButton");
// Начало баттла
const startBattleButton = document.getElementById("startBattleButton");
// Получение информации героя игрока
// Получаем информацию о герое игрока

sendToBattleButton.onclick = () => {
    fetch(`https://api-code.practicum-team.ru/heroes`)
        // Обрабатываем ответ сервера
        .then((response) => response.json())
        .then((data) => {
            // Смотрим на данные в консоли
            console.log("Интересный факт: разработчики курса предоставили нам целых " + Number(data.length) + " разных персонажей")})
    const heroName = document.getElementById("name").value;
    if (heroName !== "") {
        const heroClass = document.querySelector('input[name="class"]:checked').value;
        const heroLevel = document.getElementById("level").value;
        const heroStats = {};
        const additionalAbility = document.querySelector('input[name="additionalAbility"]:checked').value;
        const additionalStat = document.getElementById('additionalStat').value;
        // Если введённое значение параметра больше максимального, устанавливаем максимальное
        heroStats.str = Number(document.getElementById("strength").value);
        if (heroStats.str > gameParameters.MAX_STAT) {
            heroStats.str = gameParameters.MAX_STAT
        }
        heroStats.int = Number(document.getElementById("intelligence").value);
        if (heroStats.int > gameParameters.MAX_STAT) {
            heroStats.int = gameParameters.MAX_STAT
        }
        heroStats.agi = Number(document.getElementById("agility").value);
        if (heroStats.agi > gameParameters.MAX_STAT) {
            heroStats.agi = gameParameters.MAX_STAT
        }
        if (heroClass === "Mage") {
            playerHero = new Mage(heroName, heroLevel, 100, heroStats, additionalAbility, additionalStat);

            
        } else if (heroClass === "Knight") {
            playerHero = new Knight(heroName, heroLevel, 100, heroStats, additionalAbility, additionalStat);
            
        } else {
            console.error("Упс! Произошла какая-то ошибка!")
            return;
        }
        displayPlayerHero(playerHero);
        function displayPlayerHero(hero) {
            document.getElementById("playerHeroClass").innerHTML = gameClasses[hero.constructor.name];
            document.getElementById("playerHeroName").innerHTML = hero.name;
            document.getElementById("playerHeroLevel").innerHTML = hero.level;
            document.getElementById("playerHeroHp").innerHTML = hero.healthPoints;
            document.getElementById("playerHeroStrength").innerHTML = hero.stats.str;
            document.getElementById("playerHeroIntelligence").innerHTML = hero.stats.int;
            document.getElementById("playerHeroAgility").innerHTML = hero.stats.agi;

            hero.displayHero();
            // Снимаем блок с кнопок для дальнейшего взаимодействия 
            getEnemyButton.removeAttribute("disabled");
            doSkillButton.removeAttribute("disabled")
            console
        }
    } else {
        alert("Добавьте герою имя!")
    }

}


// По аналогии напишем анонимную функцию для получения оппонента
getEnemyButton.onclick = () => {
    // Тут будем запрашивать данные о персонаже с сервера
    // Получаем героя оппонента с сервера
    fetch(`https://api-code.practicum-team.ru/heroes`)
        // Обрабатываем ответ сервера
        .then((response) => response.json())
        .then((data) => {
            // Смотрим на данные в консоли
            
        
            
          
            let randomEnemy = data[Math.floor(Math.random() * data.length)]; // Случайный элемент от 0 до длины массива data.length
            console.log(randomEnemy);
            
            // Создаём экземпляр класса героя оппонента 
            // и сохраняем его в переменную enemyHero
            enemyHero = new Hero(
                randomEnemy.title, // Имя героя
                Math.floor(Math.random() * 10) + 1, // Уровень героя
                randomEnemy.hp, // Запас сил героя
                {
                    str: randomEnemy.str,
                    int: randomEnemy.int,
                    agi: randomEnemy.agi,
                }
            ); // Параметры героя
            // Заполняем карточку героя оппонента
            displayEnemyHero(enemyHero);
            function displayEnemyHero(hero) {
                document.getElementById("enemyHeroClass").innerHTML = gameClasses[hero.constructor.name];
                document.getElementById("enemyHeroName").innerHTML = hero.name;
                document.getElementById("enemyHeroLevel").innerHTML = hero.level;
                document.getElementById("enemyHeroHp").innerHTML = hero.healthPoints;
                document.getElementById("enemyHeroStrength").innerHTML = hero.stats.str;
                document.getElementById("enemyHeroIntelligence").innerHTML = hero.stats.int;
                document.getElementById("enemyHeroAgility").innerHTML = hero.stats.agi;

                hero.displayHero();
                // Проверяем, создал ли пользователь персонажа
                if (playerHero) {
                    // Если есть два участника, снимаем блок с кнопки
                    startBattleButton.removeAttribute("disabled");
                }
            }

        })
        // В случае ошибки запроса выводим сообщение об ошибке в консоль 
        .catch((error) => console.error("Ошибка:", error));
        
};

function countStatsSum(hero) {
    let statsSum = 0;
    // Последовательно прибавляем в переменную statsSum значения характеристик из объекта hero
    statsSum += hero.stats.str;
    statsSum += hero.stats.int;
    statsSum += hero.stats.agi;
    statsSum += hero.healthPoints;

    return statsSum;
}

function arena(firstHero, secondHero) {
    console.log(
        `Да начнётся танцевальный баттл между ${firstHero.name} и ${secondHero.name}!`
    );

    let winner = null;

    let fistHeroSum = countStatsSum(firstHero);
    let secondHeroSum = countStatsSum(secondHero);

    console.log("Сумма значений параметров первого героя: ", fistHeroSum);
    console.log("Сумма значений параметров второго героя: ", secondHeroSum);
    if (fistHeroSum > secondHeroSum) {
        winner = firstHero;
    } else if (fistHeroSum < secondHeroSum) {
        winner = secondHero;
    }

    if (winner) {
        console.log(`Ритмично чествуем победителя: ${winner.name}`);
        alert(`Ритмично чествуем победителя: ${winner.name}`);
    } else {
        console.log("В танцевальном баттле победила дружба!");
        alert("В танцевальном баттле победила дружба!");
    }
    return winner
} 





startBattleButton.onclick = () => {
    arena(playerHero, enemyHero);
    
}; 
const like = `
────────────────────░███░
───────────────────░█░░░█░
──────────────────░█░░░░░█░
─────────────────░█░░░░░█░
──────────░░░───░█░░░░░░█░
─────────░███░──░█░░░░░█░
───────░██░░░██░█░░░░░█░
──────░█░░█░░░░██░░░░░█░
────░██░░█░░░░░░█░░░░█░
───░█░░░█░░░░░░░██░░░█░
──░█░░░░█░░░░░░░░█░░░█░
──░█░░░░░█░░░░░░░░█░░░█░
──░█░░█░░░█░░░░░░░░█░░█░
─░█░░░█░░░░██░░░░░░█░░█░
─░█░░░░█░░░░░██░░░█░░░█░
─░█░█░░░█░░░░░░███░░░░█░
░█░░░█░░░██░░░░░█░░░░░█░
░█░░░░█░░░░█████░░░░░█░
░█░░░░░█░░░░░░░█░░░░░█░
░█░█░░░░██░░░░█░░░░░█░
─░█░█░░░░░████░░░░██░
─░█░░█░░░░░░░█░░██░█░
──░█░░██░░░██░░█░░░█░
───░██░░███░░██░█░░█░
────░██░░░███░░░█░░░█░
`;
//console.log(like);

