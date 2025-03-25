## Setup 
- Clone this repository [https://github.com/GraceChiamaka/frontend-test]
- cd project folder
- run `npm install --legacy-peer-deps` in the terminal directory of the project
- run `npm run dev` to start the dev server


## Tools & Libraries
Here's a list of tools & libraries used for this project
``` 
 react-popper
 react-toastify
 pdf-lib
 pdfjs-dist
 react-pdf
 react-dropzone
 styled-components
 downloadjs
```

- styled-component: used for styling
- react-pdf & pdfjs-dist used for rendering the uploaded pdf and text selection 
- pdf-lib: used to apply the annotations to the pdf for download
- react-popper: used for positioning annotation menu to enable easy selection
- download js: for exporting / downloading the modified pdf
- react-dropzone: to enable drag & drop of the pdf file
- react-toastify: Used for displaying notifications (toasts) in the UI


## Challenges
The challenges I encountered are: 

### Tracking User Annotations
	Issue: UI inconsistencies and potential loss of annotations when navigating between pages.
	Solution: Used useState and useRef to manage selections and interactions. However, a global state management tool (redux ) could improve scalability.

### Handling Text Selection & Range in PDFs
	Issue: Extracting selected text while preserving formatting and placement for accurate annotation was challenging.
	This had an impact causing incorrect annotation positions, misplaced pop-up menus, or missing text for multi-line selections.

	Solution: Used window.getSelection() and Range.getClientRects() to map text coordinates. A more precise PDF rendering approach would  enhance accuracy.

### UI Responsiveness & Styling Consistency
	Issue: Ensuring a smooth UI across different screen sizes while maintaining consistent annotation positioning. This issue caused layout shifts, misaligned annotations, and scaling issues on various devices.

	Solution: Used styled-components to manage styles dynamically and applied page scaling adjustments to improve annotation placement.


## Future Improvements
Future Improvements
the following features and optimizations would be great additions:

### Better Annotation Management
	Implement a global state management solution (Zustand) to persist annotations across pages and sessions.
	Enable the ability to edit or delete annotations after placement.

### Enhanced PDF Rendering & Selection Accuracy
	Improve text selection precision using a more sophisticated PDF parsing library.
	Handle multi-line and overlapping text selections more effectively.

### Improved UI/UX for Annotation Menu
	Add smooth animations and transitions for a better user experience.
	Implement a more intuitive annotation toolbar with customizable colors, shapes, and text.
