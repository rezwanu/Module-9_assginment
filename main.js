const list = document.querySelector(".navlist");
const hamburger = document.querySelector(".fa-bars");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("fa-x");
    list.classList.toggle("navlist-active");
})


let card_container = document.getElementById("card_container");

const fetchProductsData = async () => {
    try {

        const response = await fetch("https://fakestoreapiserver.reactbd.com/nextamazon");
        const products = await response.json();

        products.forEach((product) => {
            let div = document.createElement("div");

            if (product.oldPrice) {
                oldPrice = `<del>$${product.oldPrice}</del>`
            }

            if (product.isNew == true) {
                newProduct = "new";
            } else {
                newProduct = "sale";
            }

            div.innerHTML = `
            
                <div class="card ${newProduct}">
                    <img src=${product.image} alt="">
                    <div class="card_content">
                        <p class="title">${product.title}</p>
                        <div class="price">
                            <del>${oldPrice}</del>
                            <span class="amount">$${product.price}</span>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;

            card_container.appendChild(div);
        });


    } catch (err) {
        console.log(err);
    }
};

fetchProductsData();


const blog_container = document.getElementById("blog_container");

const fetchPostsData = async () => {
    try {

        const [res1, res2] = await Promise.all([
            fetch("https://fakestoreapiserver.reactbd.com/posts"),
            fetch("https://fakestoreapiserver.reactbd.com/photos")
        ]);

        let posts = await res1.json();
        let photos = await res2.json();

        posts = posts.slice(0, 6);
        photos = photos.slice(0, 6);


        posts.forEach((post, index) => {
            const photo = photos[index];

            const div = document.createElement("div");

            div.innerHTML = `
                <div class="blog_box">
                    <img src="${photo?.url}" alt="">
                    <div class="blog-content">
                        <h3 class="heading">
                            <a href="#">${post.title}</a>
                        </h3>
                        <p class="des">${post.body}</p>
                        <a href="#" class="blog-link">Read More</a>
                    </div>
                </div>
            `;
            blog_container.appendChild(div);
        });

    } catch (err) {
        console.log("Error fetching data:", err);
    }
};

fetchPostsData();


