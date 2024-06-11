document.addEventListener('DOMContentLoaded', () => {
    const contentItems = document.querySelectorAll('.content-item div');
    const dynamicParagraph = document.querySelector('.dynamic-paragraph');

    const paragraphs = {
        "REENCUENTRO": "Description for REENCUENTRO",
        "AI.RTISANSHIP": "Description for AI.RTISANSHIP",
        "SLOW FURNITURE": "Description for SLOW FURNITURE",
        "HAPPY MEAL OF THE FUTURE": "Description for HAPPY MEAL OF THE FUTURE",
        "GRESAL": "Description for GRESAL",
        "TALENT-HOP": "Description for TALENT-HOP"
    };

    contentItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imageUrl = item.getAttribute('data-image');
            const itemText = item.textContent.trim().replace(/\s+/g, ' '); // Handle multiline text
            document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
            document.body.classList.add('animate-bg');
            dynamicParagraph.textContent = paragraphs[itemText] || "";
            item.style.textDecoration = 'underline';
        });

        item.addEventListener('mouseleave', () => {
            document.body.classList.remove('animate-bg');
            dynamicParagraph.textContent = "";
            item.style.textDecoration = 'none';
        });
    });
});
