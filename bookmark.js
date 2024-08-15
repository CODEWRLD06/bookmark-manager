const urlName = document.getElementById('urlName');
const url = document.getElementById('website');
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');


const isValidUrl = (string) => {
    try {
        new URL(string);
    } catch (_) {
        alert('invalid url');
    }
};

const addSite = () => {
    const div = document.createElement('div');

    const linkName = document.createElement('h2');
    linkName.textContent = urlName.value;
    
    const link = document.createElement('a');
    link.textContent = 'Visit site';
    link.href = url.value;
    link.target = '_blank';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {

        const newUrlName = document.createElement('input')
        newUrlName.type = 'text';
        newUrlName.placeholder = 'Input new urlName';
        linkName.textContent = urlName.textContent
        newUrlName.value = linkName.textContent;
        newUrlName.classList.add('new-link-name');
        linkName.replaceWith(newUrlName);

        

        const newUrl = document.createElement('input');
        newUrl.type = 'url';
        newUrl.placeholder = 'Input new url';
        link.textContent = url.textContent;
        newUrl.value = link.textContent;
        newUrl.classList.add('new-url')
        link.replaceWith(newUrl);

        

        const updateBtn = document.createElement('button');
        updateBtn.id = 'updateBtn';
        updateBtn.textContent = 'update';
        editBtn.replaceWith(updateBtn);
        deleteBtn.remove();

        div.append(newUrlName, newUrl,updateBtn);

        updateBtn.addEventListener('click', () => {
            linkName.textContent = newUrlName.value;
            link.textContent = 'Visit site';
            link.href = newUrl.value;

            newUrlName.replaceWith(linkName);
            newUrl.replaceWith(link);

            updateBtn.replaceWith(editBtn);
            div.appendChild(deleteBtn)
        })


    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        div.remove();
    });

    div.append(linkName, link, editBtn, deleteBtn);

    container.appendChild(div);
};



addBtn.addEventListener('click', () => {
    
    if(urlName.value && isValidUrl(url.value)){
    addSite();

    console.log('Add button has been clicked')

    urlName.value = '';
    url.value = '';
    
    }else{
        alert('Please fill the urlName and url fields');
    };
});



