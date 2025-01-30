/* eslint-disable react/react-in-jsx-scope */

import JsPDF from 'jspdf';
import download from '../assets/MaterialSymbolsDownload.svg'

function generatePDF() {
    const report = new JsPDF('portrait', 'in', 'a4');

    const cv = document.querySelector('#cv') as HTMLElement
    console.log(cv)
    
    if (cv) {
      report.html(cv, {
        callback: function (doc) {
            doc.save('cv.pdf');
        },
        margin: 0,
        width: 7.75,
        windowWidth: 600
        });  
    }
};

const PdfPrint = () => {
    return (
        <div className="buttonDownload">
            <button onClick={generatePDF} aria-label="Download CV">
                <img src={download} alt="Download button icon" />
            </button>
        </div>
    );
};

export default PdfPrint;
