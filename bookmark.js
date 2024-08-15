const urlName = document.getElementById('urlName');
const url = document.getElementById('website');
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');
const deleteAllBtn = document.getElementById('deleteAllBtn');

const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

const saveToLocalStorage = () => {
    const bookmarks = Array.from(container.querySelectorAll('div')).map(div => {
        const name = div.querySelector('h2').textContent;
        const link = div.querySelector('a').href;
        return { name, url: link };
    });
    localStorage.setItem('sites', JSON.stringify(bookmarks));
};

const addSite = (siteName, siteUrl) => {
    const div = document.createElement('div');

    const linkName = document.createElement('h2');
    linkName.textContent = siteName;

    const link = document.createElement('a');
    link.textContent = 'Visit site';
    link.href = siteUrl;
    link.target = '_blank';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        const newUrlName = document.createElement('input');
        newUrlName.type = 'text';
        newUrlName.placeholder = 'Input new urlName';
        newUrlName.value = linkName.textContent;
        newUrlName.classList.add('new-link-name');
        linkName.replaceWith(newUrlName);

        const newUrl = document.createElement('input');
        newUrl.type = 'url';
        newUrl.placeholder = 'Input new url';
        newUrl.value = link.href;
        newUrl.classList.add('new-url');
        link.replaceWith(newUrl);

        const updateBtn = document.createElement('button');
        updateBtn.id = 'updateBtn';
        updateBtn.textContent = 'Update';
        editBtn.replaceWith(updateBtn);
        deleteBtn.remove();

        div.append(newUrlName, newUrl, updateBtn);

        updateBtn.addEventListener('click', () => {
            linkName.textContent = newUrlName.value;
            link.textContent = 'Visit site';
            link.href = newUrl.value;

            newUrlName.replaceWith(linkName);
            newUrl.replaceWith(link);

            updateBtn.replaceWith(editBtn);
            div.appendChild(deleteBtn);

            saveToLocalStorage();
        });
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        div.remove();
        saveToLocalStorage();
    });

    div.append(linkName, link, editBtn, deleteBtn);
    container.appendChild(div);
};

document.addEventListener('DOMContentLoaded', () => {
    container.innerHTML = '';

    const sites = JSON.parse(localStorage.getItem('sites')) || [];
    sites.forEach(site => addSite(site.name, site.url));
});

addBtn.addEventListener('click', () => {
    if (urlName.value && isValidUrl(url.value)) {
        addSite(urlName.value, url.value);
        saveToLocalStorage();

        urlName.value = '';
        url.value = '';
    } else {
        alert('Please fill in the urlName and url fields correctly.');
    }
});

const deleteAllSite = () => {
    container.innerHTML = ''; 
    saveToLocalStorage();  
    setTimeout(() => {
        alert('All bookmarks deleted successfully');
    }, 0);
};

deleteAllBtn.addEventListener('click', deleteAllSite);
