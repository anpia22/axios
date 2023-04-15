// axios GLOBaLS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// GET REQUEST
function getTodos() {
    // console.log('GET Request');
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit:5
    //     } 
    // })
    // .then(res => showOutput(res))
    // .catch(err => console.log(err))
    axios
        .get('https://jsonplaceholder.typicode.com/todos?_limit=5', { timeout:5000})
        .then(res => showOutput(res))
        .catch(err => console.log(err))
}

// POST REQUEST
function addTodo() {
    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data: {
    //         title: 'new Todo',
    //         completed: false 
    //     } 
    // })
    axios
        .post('https://jsonplaceholder.typicode.com/todos', {
            title: 'new Todo',
            completed: false
        })
        .then(res => showOutput(res))
        .catch(err => console.log(err))
    // console.log('POST Request');
}

// PUT/PATCH REQUEST
function updateTodo() {
    axios
        .patch('https://jsonplaceholder.typicode.com/todos/1', {
            title: 'updated Todo',
            completed: true
        })
        .then(res => showOutput(res))
        .catch(err => console.log(err))
    // console.log('PUT/PATCH Request');
}

// DELETE REQUEST
function removeTodo() {
    axios
        .delete('https://jsonplaceholder.typicode.com/todos/1 ')
        .then(res => showOutput(res))
        .catch(err => console.log(err))
    // console.log('DELETE Request');
}

// SIMULTANEOUS DATA
function getData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    ])
        // .then(res => {
        //     console.log(res[0]);
        //     console.log(res[1]);
        //     showOutput(res[1]);
        // })
        .then(axios.spread((todos, posts) => showOutput(posts)))
        .catch(err => console.error(err))

    // console.log('Simultaneous Request');
}

// CUSTOM HEADERS
function customHeaders() {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authrization: 'sometoken'
        }
    }
    axios
        .post('https://jsonplaceholder.typicode.com/todos', {
            title: 'new Todo',
            completed: false
        }, config
        )
        .then(res => showOutput(res))
        .catch(err => console.log(err))


    // console.log('Custom Headers');
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
            title: 'new Todo'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    }
    axios(options).then(res => showOutput(res))

    // console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
    axios
        .get('https://jsonplaceholder.typicode.com/todoss', {
            ValidityStatus : function(status){
                return status<500
            }
        })
        .then(res => showOutput(res))
        .catch(err => {
            if (err.response) {
                // Server responded with a status other than 200 range
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if (err.response.status === 404) {
                    alert('Error: Page Not Found');
                }
            } else if (err.request) {
                console.log(err.request)
            } else {
                console.error(err.message)
            }
        })

    // console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
    const source = axios.CancelToken.source()
    axios
        .get('https://jsonplaceholder.typicode.com/todos', {
            cancelToken: source.token
        })
        .then(res => showOutput(res))
        .catch(thrown => {
            if (axios.isCancel(thrown)) {
                console.log('Request cancled', thrown.message);
            }
        })

    if (true) {
        source.cancel('request cancel')
    }

    // console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
    config => {
        console.log(
            `${config.method.toUpperCase()} request send to ${config.url
            } at ${new Date().getTime()}`
        );

        return config
    }, error => {
        return Promise.reject(error);
    })

// AXIOS INSTANCES

const axiosInstance = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});
// axiosInstance.get('/comments').then(res => showOutput(res))

// Show output in browser
function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
