# Auto-PDF 0.1.0

Auto-PDF is a PDF parser that extracts data from PDF files based on predefined templates and generates an object with the extracted data. It's designed to work with PDF files located in an `input` directory and saves the results in an `output` directory. The project is also actively developing a module for SikuliX, a tool for creating automation scripts.

## Installation

To use Auto-PDF, you'll need Node.js installed on your system. You can install it using npm:

```bash
npm install auto-pdf
```

## Usage

1. Place your PDF files to be parsed in the `input` directory.

2. Configure your PDF templates and data extraction logic in the `templates` directory.

3. Run the Auto-PDF parser:

```bash
node auto-pdf.js
```

4. Auto-PDF will process the PDF files and generate data objects based on your templates. The results will be saved in the `output` directory.

## Templates

Auto-PDF templates define how data should be extracted from PDF files. Each template corresponds to a specific type of PDF document. You can define your templates in the `templates` directory, and Auto-PDF will automatically match and use the appropriate template for each PDF file.

## SikuliX Automation (Coming Soon)

Auto-PDF is actively working on a module to generate SikuliX macros automatically based on the extracted data. This module will simplify the automation of repetitive tasks by using the data extracted from PDF files.

## Changelog

- 0.1.0 (Initial Release):
  - PDF parsing functionality
  - Template-based data extraction
  - Basic automation module for SikuliX (in development)

## License

Auto-PDF is released under the [MIT License](LICENSE).
### Author
@cartudev