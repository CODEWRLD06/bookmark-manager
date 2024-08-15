const title = document.getElementById('title');
const url = document.getElementById('website');
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');


const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

const addSite = () => {
    const div = document.createElement('div');

    const titleName = document.createElement('h2');
    titleName.textContent = title.value;
    
    const link = document.createElement('a');
    link.textContent = 'Visit site';
    link.href = url.value;
    link.target = '_blank';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {

        const titleInput = document.createElement('input')
        titleInput.type = 'text';
        titleInput.placeholder = 'Input new name';
        titleName.textContent = title.textContent
        titleInput.value = titleName.textContent;
        titleName.replaceWith(titleInput);

        

        const urlInput = document.createElement('input');
        urlInput.type = 'url';
        urlInput.placeholder = 'Input new url';
        link.textContent = url.textContent;
        urlInput.value = link.textContent;
        link.replaceWith(urlInput);

        

        const updateBtn = document.createElement('button');
        updateBtn.id = 'updateBtn';
        updateBtn.textContent = 'update';
        editBtn.replaceWith(updateBtn);
        deleteBtn.remove();

        div.append(titleInput, urlInput,updateBtn);

        updateBtn.addEventListener('click', () => {
            titleName.textContent = titleInput.value;
            link.textContent = 'Visit site';
            link.href = urlInput.value;

            titleInput.replaceWith(titleName);
            urlInput.replaceWith(link);

            updateBtn.replaceWith(editBtn);
            div.appendChild(deleteBtn)
        })


    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        div.remove();
    });

    div.append(titleName, link, editBtn, deleteBtn);

    container.appendChild(div);
};



addBtn.addEventListener('click', () => {
    
    if(title.value && isValidUrl(url.value)){
    addSite();

    console.log('Add button has been clicked')

    title.value = '';
    url.value = '';
    
    }else{
        alert('Please fill the title and url fields');
    };
});



