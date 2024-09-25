
// Add Review Form Submission
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const companyName = document.getElementById('companyName').value;
    const pros = document.getElementById('pros').value;
    const cons = document.getElementById('cons').value;
    const review = document.getElementById('review').value;

    fetch('/api/add-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName, pros, cons, review }),
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').innerText = data;
        document.getElementById('reviewForm').reset();
    })
    .catch(error => console.error('Error:', error));
});

// Search Review Form Submission
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const companyName = document.getElementById('searchCompany').value;

    fetch('/api/search-review?companyName=' + companyName)
    .then(response => response.json())
    .then(data => {
        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = '';

        data.forEach(review => {
            const div = document.createElement('div');
            div.classList.add('review');
            div.innerHTML = `
                <h3><strong>Company Name:</strong>${review.company_name}</h3>
                <p><strong>Pros:</strong> ${review.pros}</p>
                <p><strong>Cons:</strong> ${review.cons}</p>
                <p><strong>Rating:</strong> ${review.review}/10</p>
            `;
            reviewsList.appendChild(div);
        });
    })
    .catch(error => console.error('Error:', error));
});

// Fetch and Display All Reviews
fetch('/api/get-reviews')
.then(response => response.json())
.then(data => {
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '';

    data.forEach(review => {
        const div = document.createElement('div');
        div.classList.add('review');
        div.innerHTML = `
            <h3>${review.company_name}</h3>
            <p><strong>Pros:</strong> ${review.pros}</p>
            <p><strong>Cons:</strong> ${review.cons}</p>
            <p>${review.review}</p>
        `;
        reviewsList.appendChild(div);
    });
})
.catch(error => console.error('Error:', error));