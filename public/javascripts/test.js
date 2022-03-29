
$('.product__action').on('click', () =>{
})

let openProductModal = event => {
    // set everything to the default value 
    $('#score').text(0);
    $('#score_reflection').attr('data-value', 0);
    fill_score()
    $("#reviews_section").html('Searching for reviews');

    event.preventDefault();
    let asin = event.target.dataset.asin;
    // alert(event.target.dataset.src)

    (async () => {
        var reviews = await get_reviews(asin)
        console.log(reviews.data.data)
        $('#score').text(reviews.data.score);
        $('#score_reflection').attr('data-value', reviews.data.score*10);
        fill_score()

        var reviews_data = reviews.data.data
        // create var to hold texts
        // for loop to go through each of topics 
        var review_cards = ''
        if(typeof reviews_data != "undefined"){
            reviews_data.forEach((eachtopic_data) => {
                review_cards = review_cards.concat(`
                                    <div class='card'>
                                        <div class="card-header" data-toggle="collapse" href="#${eachtopic_data.topic}" role="button" aria-pressed="false">
                                            <b>${eachtopic_data.display_topic}</b>
                                        </div>
                                        <div class="card-body">
                                            <div class="progress">
                                                <div class="progress-bar bg-success" style="width:${eachtopic_data.score}%">
                                                ${eachtopic_data.score}%
                                                </div>
                                                <div class="progress-bar bg-danger" style="width:${100 - eachtopic_data.score}%">
                                                ${100 - eachtopic_data.score}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class = "collapse" id = "${eachtopic_data.topic}">
                                        <div class="card">
                                            <div class="card-body">
                                    `)
                eachtopic_data.selected_revs.forEach((each_rev) => {
                    review_cards = review_cards.concat(`
                                            <div>
                                                "... ${each_rev} ..."
                                                <hr>
                                            </div>
                                        `)
                })
                review_cards = review_cards.concat(`
                                     </div>
                                        </div>
                                     </div>
                                    `)
            })
            $("#reviews_section").html(review_cards);
        }
        else{
            $("#reviews_section").html("Not enough reviews for this product");
        }
    })()


    let product = products.filter(product => {
        return product.asin == asin;
    });

    if (product.length) product = product[0];

    console.log(product);

    $('#product_name').text(product.title.substring(0,50));
    // $('.product__modal-content h4 a').text(product.title.substring(0, 50));
    $('.product__modal-content h4 a').attr('target', '_blank');
    $('.product__modal-img img').attr('src', product.image['URL']);
    $('.product__modal-form .pro-cart-btn a.add-cart-btn').attr('href', product.link);
    $('.product__modal-form .pro-cart-btn a.add-cart-btn').attr('target', '_blank');
    $('.product__modal-form .pro-cart-btn a.addtocart').attr('data-asin', product.asin);
    $('.product__modal-price').text(product.price.raw.split('.')[0]);
    $('.product__modal-form .pro-cart-btn a.add-cart-btn').text(`See it on Amazon`);
}