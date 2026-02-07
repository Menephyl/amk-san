// PDF Slider Logic
const url = 'src/assets/Apresentação Oficial Moments Paris-Jan -2026.pdf';

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

const scale = 2,
    canvas = document.querySelector('#pdf-canvas'),
    ctx = canvas.getContext('2d'),
    loader = document.querySelector('#pdf-loader');

// Render the page
const renderPage = num => {
    pageIsRendering = true;
    loader.style.display = 'block';

    // Get page
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        };

        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;
            loader.style.display = 'none';

            if (pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });

        // Output current page
        document.querySelector('#page_num').textContent = num;
    });
};

// Check for pages rendering
const queueRenderPage = num => {
    if (pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
};

// Show Prev Page
const showPrevPage = () => {
    if (pageNum <= 1) {
        pageNum = pdfDoc.numPages;
    } else {
        pageNum--;
    }
    queueRenderPage(pageNum);
};

// Show Next Page
const showNextPage = () => {
    if (pageNum >= pdfDoc.numPages) {
        pageNum = 1;
    } else {
        pageNum++;
    }
    queueRenderPage(pageNum);
};

// Get Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    document.querySelector('#page_count').textContent = pdfDoc.numPages;

    renderPage(pageNum);
}).catch(err => {
    // Display error
    const div = document.createElement('div');
    div.className = 'error';
    div.style.color = 'white';
    div.style.padding = '20px';
    div.textContent = 'Erro ao carregar o PDF: ' + err.message;
    document.querySelector('.pdf-slider-container').appendChild(div);
    loader.style.display = 'none';
});

// Button Events
document.querySelector('#pdf-prev').addEventListener('click', showPrevPage);
document.querySelector('#pdf-next').addEventListener('click', showNextPage);
