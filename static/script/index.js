$(document).ready(function() {
    getActiveUris();

    setInterval(function(){ 
        console.log('Finding deals!');
        findDeals();
    }, (1000 * 60 * 10));
});

function findDeals() {
    $.ajax({
        method: 'get',
        url: '/findDeals',
        success: function (data) {
            for(let search of data) {
                $('#output').prepend(`<p>${search.items}</p><br>`);
                $('#output').prepend(`<h3>${search.name}</h3>`);
            }
        }
    });
}

function updatePricePoint(id) {
    const price = $(`#price_point_change_${id}`).val();
    $.ajax({
        method: 'get',
        url: '/updatePricePoint',
        data: {
            id: id,
            price_point: price
        },
        success: function (data) {
            console.log(data);
            getActiveUris();
        }
    });
}
function deleteUri(id) {
    $.ajax({
        method: 'get',
        url: '/deleteUri',
        data: {
            id: id
        },
        success: function (data) {
            console.log(data);
            getActiveUris();
        }
    });
}
function addNewUri() {
    const name = $('#name_input').val();
    const uri = $("#url_input").val();
    const price = $("#price_point_input").val();

    const name_err = validateName(name);
    const uri_err = validateUri(uri);
    const price_err = validatePrice(price);
    const err = createErrorMessage(name_err, uri_err, price_err);

    $('#error_output').html(err);

    if(!err){
        // Add new uri to db
        $.ajax({
            method: 'get',
            url: '/addUri',
            data: {
                name: name,
                uri: uri,
                price_point: price
            },
            success: function (data) {
                console.log(data);
                getActiveUris();
            }
        });
    }
}

function validateName(name) {
    let str = '';
    if(name == '') {
        str = '<span>Name must be given.</span>';
    }
    return str;
}
function validateUri(uri) {
    let str = '';
    if(uri == '') {
        str = '<span>URI must be specified.</span>';
    }
    return str;
}
function validatePrice(price) {
    let str = '';
    if(price == '') {
        str = '<span>Price Point must be specified.</span>';
    }
    return str;
}
function createErrorMessage(name_err, uri_err, price_err) {
    if(name_err == '' && uri_err == '' && price_err == '') {
        return '';
    } else {
        return `${name_err} ${uri_err} ${price_err}`;
    }
}

function getActiveUris() {
    $.ajax({
        method: 'get',
        url: '/loadUriList',
        success: function (data) {
            console.log(data);
            let uri_table_str = getUriTableHeader();

            if(data.length > 0) {
                for(uri of data) {
                    uri_table_str += `
                    <tr>
                        <td>${uri.name}</td>
                        <td>${uri.price_point}</td>
                        <td><input type='text' id='price_point_change_${uri.id}' class="form-control" placeholder="New Price Point"></td>
                        <td>
                          <button onclick='updatePricePoint(${uri.id})' type='button' class="btn btn-outline-secondary">Update</button>
                          <button onclick='deleteUri(${uri.id})' type='button' class="btn btn-outline-secondary">Delete</button>
                        </td>
                    </tr>`;
                }
            } else {
                uri_table_str += `
                <tr>
                    <td colspan='4'>There are no URIs stored. Add one below.</td>
                </tr>`;
            }

            $('#uri_table').html(uri_table_str);
        }
    });
}

function getUriTableHeader() {
    return `
    <tr>
        <th scope='col'>Name</th>
        <th scope='col'>Current Price Point</th>
        <th scope='col'>Change Price Point</th>
        <th scope='col'>Actions</th>
    </tr>
    `;
}