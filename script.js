// Wait for the HTML document to fully load
document.addEventListener('DOMContentLoaded', () => {
    const pump = document.getElementById('pump');
    const balloonContainer = document.getElementById('balloon-container');
    const scoreElement = document.getElementById('score');
    const tier_status=document.getElementById('tier_tag');

    let tier_status_text="";
    let score = 0;
    let balloons = []; // Array to track multiple balloons
    let tier =["🌱 Beginner Blower","🚀Balloon Master","✨Air Wizard","☁️Sky Champion","🔥Balloon God"]
    // Array of balloon images (replace with your actual image paths)
    const balloonImages = [
        "Graphics/Symbol 100001.png",
        "Graphics/Symbol 100002.png",
        "Graphics/Symbol 100003.png",
        "Graphics/Symbol 100004.png",
        "Graphics/Symbol 100005.png"
    ];

    // Function to create a new balloon
    function createBalloon() {
        const balloon = document.createElement('img');
        balloon.className = 'balloon';

        // Assign random image
        const randomImage = balloonImages[Math.floor(Math.random() * balloonImages.length)];
        balloon.src = randomImage;

        // Set initial position and size
        balloon.style.width = '30px';
        balloon.style.height = '30px';
        balloon.dataset.size = 30; // Store size for tracking
        balloon.dataset.clicks = 0; // Store number of inflations

        // Add balloon to container and array
        balloonContainer.appendChild(balloon);
        balloons.push(balloon);

        // Click to pop functionality
        balloon.addEventListener('click', () => popBalloon(balloon));
    }

    // Function to inflate a specific balloon
    const inflateBalloon=(balloon)=> {
        let size = parseInt(balloon.dataset.size);
        let clicks = parseInt(balloon.dataset.clicks);
        
        // Increase size
        size += 20;
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size}px`; // Maintain aspect ratio

        // Update stored size and click count
        balloon.dataset.size = size;
        balloon.dataset.clicks = ++clicks;

        // If balloon reaches 3 pumps, make it fly
        if (clicks >= 3) {
            makeBalloonFly(balloon);
        }
    }

    // Function to make a balloon fly
    const makeBalloonFly=(balloon)=> {
        balloon.classList.add('flying');

        // Remove balloon after 8 seconds if not popped
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.remove();
                balloons = balloons.filter(b => b !== balloon);
            }
        }, 8000);
    }

    // Function to pop a balloon
    const popBalloon=(balloon)=> {
        if (!balloon.classList.contains('flying')) return; // Only pop flying balloons
        
        balloon.remove();
        balloons = balloons.filter(b => b !== balloon);

        // Increase score
        score += 10;
        if(score>=0 && score<=49)tier_status_text=tier[0];
        else if(score>=50 && score<=99)tier_status_text=tier[1];
        else if(score>=100 && score<=149)tier_status_text=tier[2];
        else if(score>=50 && score<=299)tier_status_text=tier[3];
        else if(score>=300)tier_status_text=tier[4];

        console.log("From popup the ballon",tier_status_text);

        scoreElement.textContent = `Score: ${score}`;
        tier_status.textContent=`${tier_status_text}`;
    }

    // Handle pump click event
    pump.addEventListener('click', () => {
        // Get the latest balloon that isn't flying
        let activeBalloon = balloons.find(b => !b.classList.contains('flying'));

        console.log("No active ballons,now pump new one")
        if (!activeBalloon) {
            createBalloon();
        } 
        // Otherwise, inflate the existing balloon
        else {
            inflateBalloon(activeBalloon);
        }
    });
});
