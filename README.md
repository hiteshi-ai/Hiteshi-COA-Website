# Hiteshi Kadian | Computer Organisation & Architecture (COA) Portfolio

An interactive, modern, and beginner-friendly academic portfolio and learning hub designed for the **Computer Organisation and Architecture (COA)** coursework at **Chandigarh University**.

---

## 📌 Student & Course Information

* **Student Name:** Hiteshi Kadian
* **UID:** 25BAI10014
* **Branch & Specialization:** Bachelor of Engineering in Computer Science & Engineering (Artificial Intelligence)
* **Subject:** Computer Organisation and Architecture
* **University:** Chandigarh University, Gharuan, Punjab
* **Academic Standing:** CGPA: 9.67 (Semester 1 SGPA: 9.65 | Semester 2 SGPA: 9.70)

---

## 🚀 Key Features

1. **Academic Hero & Profile Showcase:**
   * High-resolution student portrait extracted from university records (`assets/profile/profile.png`).
   * Quick-facts summary card displaying core enrollment details.
   * Direct navigation buttons to tools and coursework.

2. **Dedicated Section Switching Navigation:**
   * Clean single-view architecture where clicking a sidebar item displays only that specific section and cleanly hides all others.
   * Fully responsive sidebar on desktop and mobile drawer.

3. **About Me Section:**
   * Structured resume cards: Introduction, Academic Interests, Future Goals, Education history (State Topper Class XII Science Stream with 98.6%), Technical Skills, and Projects.
   * Languages & Frameworks: C++, Python, C, and JavaScript.
   * Highlighted projects: **Instruction Set Simulator**, **PQC Algorithm Recommendation System**, and **PhishGuard AI**.
   * One-click "View Resume (PDF)" button opening `assets/resume.pdf`.

4. **COA Learning Tools — Tool Selection Page & Engines:**
   * Clean tool landing page with interactive cards to launch each tool independently.
   * Quick "← Back to COA Tools" navigation.
   * **Tool 1: Number System Converter:** Bidirectional conversions between Decimal, Binary, Octal, and Hexadecimal powered by JavaScript `BigInt` with step-by-step mathematical explanations.
   * **Tool 2: Address Instruction Generator:** Generates 0-address (Stack), 1-address (Accumulator), 2-address, and 3-address instructions with full infix-to-postfix parsing and AST evaluation.

5. **Achievements & Certifications Gallery:**
   * Filterable gallery grid (Achievements, Certifications, Academic Records, Participation).
   * Interactive Lightbox Modal with full-screen image preview, captions, and keyboard controls (ESC to close, Left/Right arrows).
   * Verified credentials: Ideathon 3rd Position, Microsoft Azure AI Fundamentals (AI-900), Microsoft Azure Fundamentals (AZ-900), CUIMS Transcript, IEEE Membership, and HERizon 2026.

6. **COA Assignment-1 Section:**
   * Neutral academic submission card ("Submitted To: Dr. Ruchika Gupta").
   * Embedded PDF previewer with fallback option and direct new tab opening.
   * Interactive study accordion covering key assignment viva topics (CPU vs. GPU vs. TPU matrix, Yotta cloud, Raspberry Pi, Stampeding Herd Problem, and hardware specifications).

---

## 📂 Project Folder Structure

```text
Hiteshi_COA_Website/
├── index.html                   # Semantic HTML5 website structure
├── style.css                    # Modern CSS3 styling (Navy/Blue/Indigo theme)
├── script.js                    # Vanilla JavaScript logic (Tools, Nav, Modal)
├── README.md                    # Project documentation & viva explanation guide
├── resume.pdf                   # Official resume source document
├── profile-achievements.pdf     # Original source document for credentials
├── COA_Assignment_1.pdf         # Coursework assignment PDF
└── assets/
    ├── profile/
    │   └── profile.png          # Student profile photograph (Page 1)
    ├── gallery/
    │   ├── gallery_1.png        # Ideathon 3rd Position Certificate
    │   ├── gallery_2.png        # Build Summit (CU & byteXL)
    │   ├── gallery_3.png        # IEEE Student Membership Card
    │   ├── gallery_4.png        # Microsoft Azure AI Fundamentals (AI-900)
    │   ├── gallery_5.png        # CUIMS Academic Transcript (CGPA 9.67)
    │   ├── gallery_6.png        # Ideathon Team Felicitation
    │   ├── gallery_7.png        # HERizon 2026 Participation Certificate
    │   └── gallery_8.png        # Microsoft Azure Fundamentals (AZ-900)
    ├── assignment/
    │   └── COA_Assignment_1.pdf # Assignment-1 PDF document
    └── resume.pdf               # Resume copy for tab viewing
```

---

## 💻 How to Run the Website Locally

No build tools, compilation, or backend servers are required!

### Method 1: Direct File Opening
1. Navigate to the `Hiteshi_COA_Website` directory.
2. Double-click `index.html` to open it in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Method 2: Using a Local HTTP Server (Recommended for embedded PDF viewing)
If your browser restricts local `file:///` iframe access for PDFs:
```bash
# Using Node.js npx:
npx serve .

# Or using Python (if available):
python -m http.server 8000
```
Then open `http://localhost:3000` or `http://localhost:8000` in your browser.

---

## 🧠 Viva Explanation Guide: How the COA Tools Work

### 1. Number System Converter (`convertNumber()`)
1. **Validation (`validateNumber()`):** Uses regular expressions to ensure the input matches the chosen base (Base 2: `[0-1]`, Base 8: `[0-7]`, Base 10: `[0-9]`, Base 16: `[0-9a-fA-F]`).
2. **Arbitrary Precision Parsing (`parseToBigInt()`):** Converts the input into native JavaScript `BigInt` via radix prefixes (`0b` for binary, `0o` for octal, `0x` for hex).
3. **Target Base Conversion:** Invokes `.toString(radix)` on the `BigInt` value to produce exact, non-truncated output in any base.
4. **Mathematical Explanation (`buildConversionExplanation()`):** Displays the positional polynomial summation:
   $$\text{Value}_{10} = \sum_{i=0}^{n-1} d_i \times \text{Base}^i$$
   followed by repeated division steps for the target base.

---

### 2. Address Instruction Generator (`generateInstructions()`)
1. **Tokenization (`tokenizeExpression()`):** Parses an arithmetic string (e.g. `(A+B)*(C+D)`) into an array of operand tokens, operator tokens, and parentheses while checking for syntax errors.
2. **Infix to Postfix (`infixToPostfix()`):** Implements Edsger Dijkstra's **Shunting-Yard Algorithm** using an operator stack and precedence table:
   * Power (`^`): Precedence 4 (Right-associative)
   * Multiply/Divide (`*`, `/`): Precedence 3 (Left-associative)
   * Add/Subtract (`+`, `-`): Precedence 2 (Left-associative)
   For `(A+B)*(C+D)`, the postfix output is: `A B + C D + *`.
3. **Abstract Syntax Tree (`buildAST()`):** Reconstructs the hierarchical operator-operand tree from the postfix tokens.
4. **Instruction Generation Algorithms:**
   * **3-Address (`generateThreeAddress()`):**
     * Post-order traversal of the AST. Emits `OP Dest, Src1, Src2`.
     * Example:
       ```assembly
       ADD R1, A, B
       ADD R2, C, D
       MUL X, R1, R2
       ```
   * **2-Address (`generateTwoAddress()`):**
     * Dest operand is also a source operand (`Dest = Dest OP Src`).
     * Emits `MOV` to load the first operand into a working register.
     * Example:
       ```assembly
       MOV R1, A
       ADD R1, B
       MOV R2, C
       ADD R2, D
       MUL R1, R2
       MOV X, R1
       ```
   * **1-Address (`generateOneAddress()`):**
     * Accumulator (`AC`) architecture. All operations happen implicitly with the AC (`AC = AC OP Memory`).
     * Subexpressions are preserved in temporary memory locations (`T1`, `T2`).
     * Example:
       ```assembly
       LOAD A
       ADD B
       STORE T1
       LOAD C
       ADD D
       MUL T1
       STORE X
       ```
   * **0-Address (`generateZeroAddress()`):**
     * Stack machine architecture. Pushes operands to the Top of Stack (`TOS`) and pops them for ALU operations.
     * Directly reflects postfix evaluation without explicit memory addresses in ALU opcodes.
     * Example:
       ```assembly
       PUSH A
       PUSH B
       ADD
       PUSH C
       PUSH D
       ADD
       MUL
       ```

---

## 🖼️ How to Replace Assets

* **Profile Picture:** Replace `assets/profile/profile.png` with a square or portrait image (PNG format).
* **Gallery Images:** Add or replace images in `assets/gallery/` (`gallery_1.png` to `gallery_8.png`) and update the `galleryItems` array in `script.js` if you wish to change captions or categories.
* **Assignment PDF:** Replace `assets/assignment/COA_Assignment_1.pdf` with any new version of your assignment PDF.
* **Resume PDF:** Replace `assets/resume.pdf` with an updated PDF resume.

---

## 🛠️ Technology Stack
* **HTML5:** Semantic layout with ARIA accessibility roles.
* **CSS3:** Custom properties (CSS variables), CSS Grid, Flexbox, backdrop-filter, responsive breakpoints.
* **JavaScript (ES6+):** Pure Vanilla JS, BigInt API, DOM manipulation, no external runtime dependencies.
