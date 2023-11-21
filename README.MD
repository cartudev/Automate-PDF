# Automate-PDF 0.2.0

Automate-PDF is a PDF parser that extracts data from PDF files based on predefined templates and generates an object with the extracted data. It's designed to work with PDF files located in an input directory and moves the files with data obtained from the templates folder to an output directory. The project also provides the option to integrate with SikuliX, a tool for creating automation scripts, for additional automation capabilities.


## Installation

1. **Java**: Ensure you have Java installed on your system. You can download it [here](https://www.java.com/en/download/).

2. **SikuliX**: The SikuliX module in this project automates the setup of SikuliX by automatically downloading SikuliX IDE 2.0.5 from [here](https://launchpad.net/sikuli/+milestone/2.0.5) and placing it in the `module_sikuli` folder. If you prefer you can download your own version of SikuliX [official SikuliX repository on GitHub](https://github.com/RaiMan/SikuliX1).

3. **Clone the repository**: Clone this repository to your local machine:

SikuliX module setup (optional): If you don't want to use the SikuliX module, you can deactivate it by changing the sikuliMod variable in the configuration file.

Note: In future updates, Auto-PDF aims to provide an option for obtaining information through the console interface as an alternative to SikuliX automation.

## Usage

1. Place your PDF files to be parsed in the `input` directory.

2. Configure your PDF templates and data extraction logic in the `templates` directory.

3. Run the Auto-PDF parser:

```bash
node automate-pdf.js
```

4. Auto-PDF will process the PDF files and generate data objects based on your templates. The results will be saved in the `output` directory.

## Templates

Auto-PDF templates serve as guides for extracting data from PDF files, with each template designed for a specific type of document. To define your templates, utilize the `templates` directory, and Auto-PDF will automatically match and apply the relevant template to each PDF file.

### Customizing Template Matching

In the `automate-pdf.js` file, within the `PDFParser` class, you'll find the `detectPDFType` method. This method uses an object `objRS` with keys to reference the template file and values that match relevant information indicative of the document type (e.g., the name of the business). If a match is found in the PDF, the `parsePDF` method in the same class extracts information based on the specified template.

Despite some PDF files sharing a common structure for information extraction, a decision was made to individually reference this common template for enhanced control and security.


## SikuliX Automation (0.2.0 Release)

Automate-PDF now features a SikuliX automation module in version 0.2.0. This module streamlines the process of generating SikuliX macros based on the extracted data from PDF files, offering enhanced automation for repetitive tasks.

### Modifying SikuliX Automation Script

To customize the SikuliX automation script, navigate to the `module_sikuli` folder. Inside, you will find the `sikuli_model_base` folder containing the Python script `sikuli_model_base.py`. It is recommended not to change the filename, as the compressed file must have the same name as the script for Sikuli to function properly with the executable file.

For more detailed information on SikuliX, refer to the [SikuliX documentation page](https://sikulix-2014.readthedocs.io/).


## Changelog

- 0.2.0 (SikuliX Integration):

  - Renamed project from Auto-PDF to Automate-PDF
  - Added SikuliX automation module
  - Minor bug fixes in PDF parsing
  - Updated documentation

- 0.1.0 (Initial Release):
  - PDF parsing functionality
  - Template-based data extraction
  - Basic automation module for SikuliX (in development)

## License

Automate-PDF is released under the [MIT License](LICENSE).
SikuliX is released under the [MIT License](LICENSE)

### Author

[@cartudev](https://github.com/cartudev/)

### Special Thanks

A special thanks to [@RaiMan](https://github.com/RaiMan) for their valuable contributions with the sikulix project.
