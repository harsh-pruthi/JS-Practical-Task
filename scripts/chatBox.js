const API_KEY = "AIzaSyBPlhiRnFoQPo2VsfrcdUjLYg-0iKVIErY";

let chatHistory = [];

async function sendMessage() {
    const userMessage = document.querySelector("#chatInput").value;
    
    if (userMessage.length) {
        try {
            // Clear input
            document.querySelector("#chatInput").value = "";
            
            // Add user message to chat
            document.querySelector("#chatMessages").insertAdjacentHTML("beforeend", `
                <div class="user flex justify-end">
                    <p class="bg-blue-500 text-white rounded-2xl w-4/5 my-2 text-base p-4">${userMessage}</p>
                </div>
            `);

            // Add loading indicator
            document.querySelector("#chatMessages").insertAdjacentHTML("beforeend", `
                <div class="w-10 opacity-40 aspect-[4] bg-[radial-gradient(circle_closest-side,#000_90%,#0000)_0/calc(100%/3)_100%_space] loader-animation"></div>
            `);

            // Create model response container
            document.querySelector("#chatMessages").insertAdjacentHTML("beforeend", `
                <div class="model">
                    <p class="bg-gray-100 rounded-2xl w-4/5 my-2 text-base p-4"></p>
                </div>
            `);
            
            const modelResponseElement = document.querySelectorAll("#chatMessages div.model");
            const responseContainer = modelResponseElement[modelResponseElement.length - 1].querySelector("p");

            // Prepare messages for API
            const messages = [];
            
            // Add current user message
            messages.push({
                role: "user",
                parts: [{ text: userMessage }]
            });
            
            // Store user message in history
            chatHistory.push({
                role: "user",
                parts: [{ text: userMessage }]
            });

            // Make API request
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: messages,
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 1024
                        }
                    })
                });
                
                const responseData = await response.json();
                
                if (responseData.candidates && responseData.candidates.length > 0) {
                    const modelResponse = responseData.candidates[0].content.parts[0].text;
                    
                    // Display response word by word for a streaming-like effect
                    const words = modelResponse.split(' ');
                    for (let i = 0; i < words.length; i++) {
                        await new Promise(resolve => setTimeout(resolve, 50));
                        responseContainer.textContent += (i > 0 ? ' ' : '') + words[i];
                    }
                    
                    // Store model response in history
                    chatHistory.push({
                        role: "model",
                        parts: [{ text: modelResponse }]
                    });
                } else {
                    responseContainer.textContent = "I'm sorry, I couldn't generate a response. Please try again.";
                }
            } catch (error) {
                console.error("API error:", error);
                responseContainer.textContent = "Sorry, there was an error communicating with the AI service. Please try again.";
            }

        } catch (error) {
            document.querySelector("#chatMessages").insertAdjacentHTML("beforeend", `
                <div class="error">
                    <p class="text-red-500 text-center text-sm">The message could not be sent. Please try again.</p>
                </div>
            `);
        } finally {
            // Remove loading indicator
            const loader = document.querySelector("#chatMessages .loader-animation");
            if (loader) loader.remove();
            
            // Scroll to bottom
            const chatContainer = document.querySelector("#chatMessages");
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }
}

// Event listeners
document.querySelector("#sendButton").addEventListener("click", sendMessage);

document.querySelector("#chatInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const chatButton = document.querySelector("#chatButton");
    const mailPromo = document.querySelector("#mail-promo");

    if (chatButton && mailPromo) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        chatButton.style.display = "none"; // Hide button
                    } else {
                        chatButton.style.display = "flex"; // Show button
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of #mail-promo is visible
        );

        observer.observe(mailPromo);
    }
});


document.querySelector("#chatButton").addEventListener("click", () => {
    document.querySelector("#chatWindow").classList.remove("hidden");
    document.querySelector("#chatWindow").classList.add("flex");
});

document.querySelector("#closeChat").addEventListener("click", () => {
    document.querySelector("#chatWindow").classList.remove("flex");
    document.querySelector("#chatWindow").classList.add("hidden");
});