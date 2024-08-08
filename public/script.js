const parallax = document.querySelector('.parallax');

window.addEventListener('scroll', function () {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.7 + 'px';
});

// Function to simulate adding an item to the cart
function addToCart() {
    alert('Item added to the cart. Continue shopping or proceed to checkout.');
}

// Function to simulate the checkout process
function checkout() {
    alert('You are being redirected to the checkout page.');
}

// Function to simulate contacting an employee
function contactEmployee() {
    alert('Please fill out the contact form, and our employee will get in touch with you shortly.');
}

// JavaScript to open the online store in a new window
function openOnlineStore() {
    // Define the URL of the online store page
    const onlineStoreURL = 'online-store.html'; // Change this to the actual URL

    // Open a new window
    window.open(onlineStoreURL, '_blank');
}

// Initialize an empty shopping cart
const cart = [];

// Function to add items to the cart
function addToCart(productName, price) {
    cart.push({ productName, price });
    alert(productName + ' added to cart.');
}

// Function to handle the checkout process
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        let total = 0;
        for (const item of cart) {
            total += item.price;
        }
        alert('Checkout successful! Total: $' + total);
        cart.length = 0; // Clear the cart after checkout
    }
}


    // Get the search button element
    const searchButton = document.getElementById("search-button");

    // Get the search bar element
    const searchBar = document.getElementById("search-box");

    // Function to toggle the visibility of the search box
    function toggleSearchBox() {
        const searchBoxContainer = document.getElementById("search-box-container");
        searchBoxContainer.classList.toggle("active");
        searchBar.focus(); // Set focus to the search bar when it is toggled
    }

    // Attach a click event to the search button
    searchButton.addEventListener("click", toggleSearchBox);

    // JavaScript functions for search functionality

    // Function to perform the search and display results
    function performSearch() {
        const searchInput = document.getElementById("search-box");
        const searchTerm = searchInput.value;
    
        const products = [
            { name: "Audio-technica ATH-M50x", description: "Better Sound Quality with ENC Technology.", price: 199.99, image: "/image/1.png" },
            { name: "AKG K701-Anime Art Edition", description: "The Best Combo For 'BASS' and Sound 'Quality'.", price: 149.99, image: "/image/2.png" },
            { name: "Sony WH-1000XM4", description: "Better Sound Quality with ENC Technology.", price: 349.99, image: "/image/3.png" },
            { name: "Sennheiser HD 660 S - Limited Edition", description: "The Best Combo For 'BASS' and Sound 'Quality'.", price: 499.99, image: "/image/4.png" },
            { name: "Beyerdynamic DT 990 Pro", description: "Better Sound Quality with ENC Technology.", price: 169.99, image: "/image/5.png" },
            { name: "HyperX CLoud Alpha", description: "The Best Combo For 'BASS' and Sound 'Quality'.", price: 249.99, image: "/image/6.png" },
            { name: "Razer Kraken - Anime Collection", description: "Better Sound Quality with ENC Technology.", price: 200, image: "/image/7.png" },
            { name: "JBL Quantum 600 - Freak Edition", description: "The Best Combo For 'BASS' and Sound 'Quality'.", price: 200, image: "/image/8.png" },
        ];
    
        const searchResults = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        // Display the search results in the HTML
        const resultsList = document.getElementById("results-list");
        resultsList.innerHTML = ""; // Clear previous results
    
        if (searchResults.length === 0) {
            resultsList.innerHTML = "<li>No results found.</li>";
        } else {
            searchResults.forEach(product => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Price: $${product.price.toFixed(2)}</p>
                        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                    </div>
                `;
                resultsList.appendChild(listItem);
            });
        }
    
        // Show the search results modal
        displaySearchResults();
    }
    // Function to display the search results modal
    function displaySearchResults() {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

  // Get the close button for the modal
const closeModal = document.querySelector(".close");

// Close the modal when the close button is clicked
closeModal.addEventListener("click", function() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
});

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
// Function to display the search results modal
function displaySearchResults() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    
    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

    