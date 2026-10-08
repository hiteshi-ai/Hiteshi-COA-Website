/**
 * ==============================================================================
 * HITESHI KADIAN | COA LEARNING PORTFOLIO
 * Main JavaScript Controller
 * 
 * Features:
 * 1. Mobile Sidebar Navigation & Active ScrollSpy
 * 2. Number System Converter (BigInt-based Radix Conversion & Mathematical Explanations)
 * 3. Address Instruction Generator (Infix-to-Postfix Parser, AST & 0/1/2/3-Address Engines)
 * 4. Achievements & Certifications Gallery Lightbox & Filtering
 * 5. Assignment PDF Fallback & Notification System
 * ==============================================================================
 */

// Strict mode for cleaner code and prevention of accidental global variables
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. NAVIGATION & RESPONSIVE SIDEBAR
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');

  // Toggle mobile navigation drawer
  function toggleMobileMenu() {
    const isOpen = sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('active', isOpen);
    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
  }

  function closeMobileMenu() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileMenu);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileMenu);

  /* ==========================================================================
     SECTION SWITCHING (PAGE DISPLAY CONTROLLER)
     ========================================================================== */
  function showSection(sectionId) {
    sections.forEach(sec => {
      if (sec.id === sectionId) {
        sec.classList.add('active-section');
        sec.style.display = 'block';
      } else {
        sec.classList.remove('active-section');
        sec.style.display = 'none';
      }
    });

    // Update active highlight on sidebar nav items
    navLinks.forEach(link => {
      const linkSection = link.getAttribute('data-section') || (link.getAttribute('href') || '').replace('#', '');
      if (linkSection === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // When opening tools, always display the tool selection page
    if (sectionId === 'tools') {
      showToolSelection();
    }

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Close menu if open on mobile
    closeMobileMenu();
  }

  // Sidebar navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('data-section') || (link.getAttribute('href') || '').replace('#', '');
      if (targetSection) {
        showSection(targetSection);
      }
    });
  });

  // Hero action buttons
  const heroExploreToolsBtn = document.getElementById('heroExploreToolsBtn');
  const heroAboutBtn = document.getElementById('heroAboutBtn');
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (heroExploreToolsBtn) {
    heroExploreToolsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('tools');
    });
  }
  if (heroAboutBtn) {
    heroAboutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('about');
    });
  }
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('home');
    });
  }

  /* ==========================================================================
     2. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add('active');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('active');
    }, 2800);
  }

  /* ==========================================================================
     3. COA LEARNING TOOLS: SELECTION PAGE & ROUTING
     ========================================================================== */
  const toolSelectionView = document.getElementById('toolSelectionView');
  const converterToolView = document.getElementById('converterToolView');
  const instructionToolView = document.getElementById('instructionToolView');

  const openConverterBtn = document.getElementById('openConverterBtn');
  const openInstructionBtn = document.getElementById('openInstructionBtn');
  const selectCardConverter = document.getElementById('selectCardConverter');
  const selectCardInstruction = document.getElementById('selectCardInstruction');
  const backFromConverterBtn = document.getElementById('backFromConverterBtn');
  const backFromInstructionBtn = document.getElementById('backFromInstructionBtn');

  function showToolSelection() {
    if (toolSelectionView) toolSelectionView.classList.remove('hidden');
    if (converterToolView) converterToolView.classList.add('hidden');
    if (instructionToolView) instructionToolView.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openTool(toolName) {
    if (toolSelectionView) toolSelectionView.classList.add('hidden');
    if (toolName === 'converter') {
      if (converterToolView) converterToolView.classList.remove('hidden');
      if (instructionToolView) instructionToolView.classList.add('hidden');
    } else if (toolName === 'instruction') {
      if (converterToolView) converterToolView.classList.add('hidden');
      if (instructionToolView) instructionToolView.classList.remove('hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (openConverterBtn) {
    openConverterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openTool('converter');
    });
  }
  if (selectCardConverter) {
    selectCardConverter.addEventListener('click', () => {
      openTool('converter');
    });
  }

  if (openInstructionBtn) {
    openInstructionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openTool('instruction');
    });
  }
  if (selectCardInstruction) {
    selectCardInstruction.addEventListener('click', () => {
      openTool('instruction');
    });
  }

  if (backFromConverterBtn) {
    backFromConverterBtn.addEventListener('click', showToolSelection);
  }
  if (backFromInstructionBtn) {
    backFromInstructionBtn.addEventListener('click', showToolSelection);
  }

  /* ==========================================================================
     4. TOOL 1: NUMBER SYSTEM CONVERTER
     ========================================================================== */
  const inputBaseSelect = document.getElementById('inputBaseSelect');
  const outputBaseSelect = document.getElementById('outputBaseSelect');
  const converterInput = document.getElementById('converterInput');
  const converterOutput = document.getElementById('converterOutput');
  const convertBtn = document.getElementById('convertBtn');
  const clearConverterBtn = document.getElementById('clearConverterBtn');
  const clearInputBtn = document.getElementById('clearInputBtn');
  const swapBasesBtn = document.getElementById('swapBasesBtn');
  const copyResultBtn = document.getElementById('copyResultBtn');
  const converterError = document.getElementById('converterError');
  const converterErrorMsg = document.getElementById('converterErrorMsg');
  const stepsToggleContainer = document.getElementById('stepsToggleContainer');
  const toggleStepsBtn = document.getElementById('toggleStepsBtn');
  const toggleStepsIcon = document.getElementById('toggleStepsIcon');
  const toggleStepsText = document.getElementById('toggleStepsText');
  const conversionStepsCard = document.getElementById('conversionStepsCard');
  const stepsRoutePill = document.getElementById('stepsRoutePill');
  const stepsBody = document.getElementById('stepsBody');
  const inputHelperText = document.getElementById('inputHelperText');
  const chipButtons = document.querySelectorAll('.chip-btn');

  let areConversionStepsVisible = false;

  const RADIX_SUBSCRIPTS = {
    '2': '₂',
    '8': '₈',
    '10': '₁₀',
    '16': '₁₆'
  };

  const SUPERSCRIPTS = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };

  function toSuperscript(num) {
    return String(num).split('').map(d => SUPERSCRIPTS[d] || d).join('');
  }

  // Base names helper
  const BASE_NAMES = {
    '2': 'Binary (Base 2)',
    '8': 'Octal (Base 8)',
    '10': 'Decimal (Base 10)',
    '16': 'Hexadecimal (Base 16)'
  };

  const BASE_PATTERNS = {
    '2': /^[0-1]+$/,
    '8': /^[0-7]+$/,
    '10': /^[0-9]+$/,
    '16': /^[0-9a-fA-F]+$/
  };

  const BASE_ALLOWED_HINTS = {
    '2': 'Allowed characters: 0, 1',
    '8': 'Allowed characters: 0–7',
    '10': 'Allowed characters: 0–9',
    '16': 'Allowed characters: 0–9, A–F'
  };

  // Update input placeholder and helper text on base change
  function updateInputHelper() {
    const base = inputBaseSelect.value;
    inputHelperText.innerHTML = BASE_ALLOWED_HINTS[base];
    if (base === '2') converterInput.placeholder = 'e.g. 11001';
    else if (base === '8') converterInput.placeholder = 'e.g. 31';
    else if (base === '10') converterInput.placeholder = 'e.g. 25';
    else if (base === '16') converterInput.placeholder = 'e.g. 19 or 1A';
  }

  // Validate number string against selected base
  function validateNumber(rawInput, base) {
    const cleaned = rawInput.trim();
    if (!cleaned) {
      return { isValid: false, error: 'Please enter a number to convert.' };
    }
    const regex = BASE_PATTERNS[base];
    if (!regex.test(cleaned)) {
      if (base === '2') return { isValid: false, error: 'Invalid Binary input! Only digits 0 and 1 are allowed.' };
      if (base === '8') return { isValid: false, error: 'Invalid Octal input! Only digits 0 through 7 are allowed.' };
      if (base === '10') return { isValid: false, error: 'Invalid Decimal input! Only digits 0 through 9 are allowed.' };
      if (base === '16') return { isValid: false, error: 'Invalid Hexadecimal input! Only 0–9 and A–F characters are allowed.' };
    }
    return { isValid: true, cleaned };
  }

  // Parse any base string into BigInt
  function parseToBigInt(str, base) {
    const cleaned = str.trim();
    if (base === '10') return BigInt(cleaned);
    if (base === '2') return BigInt('0b' + cleaned);
    if (base === '8') return BigInt('0o' + cleaned);
    if (base === '16') return BigInt('0x' + cleaned);
    throw new Error('Unsupported base');
  }

  // Set visibility of conversion steps
  function setStepsVisibility(visible) {
    areConversionStepsVisible = visible;
    if (visible) {
      if (conversionStepsCard) conversionStepsCard.classList.remove('hidden');
      if (toggleStepsText) toggleStepsText.textContent = 'Hide Steps';
      if (toggleStepsIcon) toggleStepsIcon.textContent = '✕';
      if (toggleStepsBtn) toggleStepsBtn.classList.add('active');
    } else {
      if (conversionStepsCard) conversionStepsCard.classList.add('hidden');
      if (toggleStepsText) toggleStepsText.textContent = 'Show Conversion Steps';
      if (toggleStepsIcon) toggleStepsIcon.textContent = '📖';
      if (toggleStepsBtn) toggleStepsBtn.classList.remove('active');
    }
  }

  // Helper for Repeated Division data
  function getRepeatedDivisionSteps(decimalBigInt, toBase) {
    let current = BigInt(decimalBigInt);
    const base = BigInt(toBase);
    const rows = [];
    if (current === 0n) {
      rows.push({ dividend: 0n, quotient: 0n, remainder: 0n, remChar: '0' });
    } else {
      while (current > 0n) {
        const q = current / base;
        const rem = current % base;
        const remChar = rem < 10n ? rem.toString() : String.fromCharCode(65 + Number(rem - 10n));
        rows.push({ dividend: current, quotient: q, remainder: rem, remChar });
        current = q;
      }
    }
    return rows;
  }

  // Helper for Positional Expansion data
  function getPositionalExpansionData(inputStr, fromBase) {
    const digits = inputStr.toUpperCase().split('');
    const n = digits.length;
    const base = BigInt(fromBase);
    const termsFormula = [];
    const termsSubstituted = [];
    const termsValues = [];
    let hasHexLetters = false;
    let total = 0n;

    for (let i = 0; i < n; i++) {
      const power = BigInt(n - 1 - i);
      const char = digits[i];
      const val = BigInt(parseInt(char, parseInt(fromBase, 10)));
      const termVal = val * (base ** power);
      total += termVal;

      termsFormula.push(`${char}×${fromBase}${toSuperscript(power)}`);
      if (parseInt(fromBase, 10) === 16 && val >= 10n) {
        hasHexLetters = true;
        termsSubstituted.push(`${val}×${fromBase}${toSuperscript(power)}`);
      } else {
        termsSubstituted.push(`${val}×${fromBase}${toSuperscript(power)}`);
      }
      termsValues.push(termVal.toString(10));
    }
    return { digits, termsFormula, termsSubstituted: hasHexLetters ? termsSubstituted : null, termsValues, total };
  }

  // Generate detailed step-by-step mathematical conversion breakdown
  function buildConversionSteps(inputStr, fromBase, outputStr, toBase, decimalBigInt) {
    if (!stepsBody || !stepsRoutePill) return;

    const fromName = BASE_NAMES[fromBase];
    const toName = BASE_NAMES[toBase];
    const fromSub = RADIX_SUBSCRIPTS[fromBase] || `_{${fromBase}}`;
    const toSub = RADIX_SUBSCRIPTS[toBase] || `_{${toBase}}`;
    const cleanUpper = inputStr.toUpperCase();

    // Route pill
    stepsRoutePill.textContent = `${fromName.split(' ')[0]} (${fromBase}) → ${toName.split(' ')[0]} (${toBase})`;

    let html = '';

    // Register bit width insight
    const bitLength = decimalBigInt === 0n ? 1 : decimalBigInt.toString(2).length;
    let byteWidth = 8;
    if (bitLength > 32) byteWidth = 64;
    else if (bitLength > 16) byteWidth = 32;
    else if (bitLength > 8) byteWidth = 16;
    const vivaBitNote = `Minimum representation: <strong>${bitLength} bits</strong> | Standard CPU register size: <strong>${byteWidth}-bit Register</strong>.`;

    // CASE 1: DECIMAL -> OTHER BASE (Repeated Division)
    if (fromBase === '10' && toBase !== '10') {
      const divRows = getRepeatedDivisionSteps(decimalBigInt, toBase);

      const tableRowsHtml = divRows.map(r => {
        const hexCol = (toBase === '16' && r.remainder >= 10n)
          ? `<td style="color:#0284c7; font-weight:700;">${r.remChar} (${r.remainder})</td>`
          : (toBase === '16' ? `<td>${r.remChar}</td>` : '');
        return `
          <tr>
            <td>${r.dividend.toString(10)} ÷ ${toBase}</td>
            <td>${r.quotient.toString(10)}</td>
            <td class="division-rem-cell">${r.remainder.toString(10)}</td>
            ${hexCol}
          </tr>
        `;
      }).join('');

      const textDivisionLines = divRows.map(r => {
        const hexExtra = (toBase === '16' && r.remainder >= 10n) ? ` (${r.remChar})` : '';
        return `${r.dividend.toString(10)} ÷ ${toBase} = ${r.quotient.toString(10)}  remainder ${r.remainder.toString(10)}${hexExtra}`;
      }).join('<br>');

      html += `
        <!-- Step 1: Repeated Division -->
        <div class="step-box">
          <div class="step-box-header">
            <span class="step-num-pill">Step 1</span>
            <span class="step-box-title">Repeated Integer Division by Radix ${toBase}</span>
          </div>
          <p class="step-box-desc">
            To convert decimal integer <strong>${cleanUpper}₁₀</strong> to Base ${toBase} (${toName.split(' ')[0]}), repeatedly divide the quotient by <strong>${toBase}</strong> and record the remainder at each step until the quotient reaches 0:
          </p>
          <div class="division-table-wrap">
            <table class="division-table">
              <thead>
                <tr>
                  <th>Division Operation</th>
                  <th>Quotient</th>
                  <th>Remainder</th>
                  ${toBase === '16' ? '<th>Hex Digit</th>' : ''}
                </tr>
              </thead>
              <tbody>
                ${tableRowsHtml}
              </tbody>
            </table>
          </div>
          <div class="expansion-math-box" style="margin-top: 8px;">
            ${textDivisionLines}
          </div>
        </div>

        <!-- Step 2: Read Remainders -->
        <div class="step-box">
          <div class="step-box-header">
            <span class="step-num-pill">Step 2</span>
            <span class="step-box-title">Read Remainders from Bottom to Top</span>
          </div>
          <p class="step-box-desc">
            The last non-zero remainder forms the <strong>Most Significant Digit (MSD)</strong>, and the first remainder is the <strong>Least Significant Digit (LSD)</strong>. Reading from bottom to top:
          </p>
          <div class="division-arrow-box">
            <span>⬆ Read remainders from bottom to top:</span>
            <strong style="font-family:var(--font-mono); font-size:0.95rem; letter-spacing:1px;">${outputStr}</strong>
          </div>
        </div>

        <!-- Final Result -->
        <div class="step-box final-result-box">
          <div class="step-box-header">
            <span class="step-num-pill" style="background-color:#10b981;">Final Result</span>
            <span class="step-box-title">Radix Equivalence</span>
          </div>
          <div class="final-result-val">${cleanUpper}₁₀ = ${outputStr}${toSub}</div>
          <div class="steps-viva-tip">
            <strong>Viva Concept:</strong> ${vivaBitNote}
          </div>
        </div>
      `;
    }

    // CASE 2: BINARY / OCTAL / HEXADECIMAL -> DECIMAL (Positional Expansion)
    else if (fromBase !== '10' && toBase === '10') {
      const expData = getPositionalExpansionData(cleanUpper, fromBase);

      html += `
        <!-- Step 1: Positional Expansion -->
        <div class="step-box">
          <div class="step-box-header">
            <span class="step-num-pill">Step 1</span>
            <span class="step-box-title">Positional Weight Expansion</span>
          </div>
          <p class="step-box-desc">
            Multiply each digit in <strong>${cleanUpper}${fromSub}</strong> by the radix <strong>${fromBase}</strong> raised to its positional power (0-indexed from right to left):
          </p>
          <div class="expansion-math-box">
            <div class="expansion-line">${cleanUpper}${fromSub}</div>
            <div class="expansion-line">= ${expData.termsFormula.join(' + ')}</div>
            ${expData.termsSubstituted ? `<div class="expansion-line">= ${expData.termsSubstituted.join(' + ')}</div>` : ''}
          </div>
        </div>

        <!-- Step 2: Multiply Terms -->
        <div class="step-box">
          <div class="step-box-header">
            <span class="step-num-pill">Step 2</span>
            <span class="step-box-title">Evaluate Positional Products</span>
          </div>
          <p class="step-box-desc">
            Calculate each individual weighted power of ${fromBase}:
          </p>
          <div class="expansion-math-box">
            <div class="expansion-line highlight">= ${expData.termsValues.join(' + ')}</div>
          </div>
        </div>

        <!-- Step 3: Sum -->
        <div class="step-box">
          <div class="step-box-header">
            <span class="step-num-pill">Step 3</span>
            <span class="step-box-title">Sum the Evaluated Terms</span>
          </div>
          <div class="expansion-math-box">
            <div class="expansion-line highlight">= ${decimalBigInt.toString(10)}</div>
          </div>
        </div>

        <!-- Final Result -->
        <div class="step-box final-result-box">
          <div class="step-box-header">
            <span class="step-num-pill" style="background-color:#10b981;">Final Result</span>
            <span class="step-box-title">Radix Equivalence</span>
          </div>
          <div class="final-result-val">${cleanUpper}${fromSub} = ${outputStr}₁₀</div>
          <div class="steps-viva-tip">
            <strong>Viva Concept:</strong> Positional notation models digital storage: each digit position has weight <code>Base<sup>index</sup></code>. ${vivaBitNote}
          </div>
        </div>
      `;
    }

    // CASE 3: OTHER BASE CONVERSIONS (e.g. Bin <-> Oct, Bin <-> Hex, Oct <-> Hex)
    else if (fromBase !== '10' && toBase !== '10' && fromBase !== toBase) {
      const expData = getPositionalExpansionData(cleanUpper, fromBase);
      const divRows = getRepeatedDivisionSteps(decimalBigInt, toBase);

      const tableRowsHtml = divRows.map(r => {
        const hexCol = (toBase === '16' && r.remainder >= 10n)
          ? `<td style="color:#0284c7; font-weight:700;">${r.remChar} (${r.remainder})</td>`
          : (toBase === '16' ? `<td>${r.remChar}</td>` : '');
        return `
          <tr>
            <td>${r.dividend.toString(10)} ÷ ${toBase}</td>
            <td>${r.quotient.toString(10)}</td>
            <td class="division-rem-cell">${r.remainder.toString(10)}</td>
            ${hexCol}
          </tr>
        `;
      }).join('');

      let shortcutTip = '';
      if (fromBase === '2' && toBase === '8') {
        shortcutTip = `<strong>Direct Grouping Shortcut (3 Bits = 1 Octal Digit):</strong> Since 2³ = 8, group the binary bits into clusters of 3 from right to left (pad with leading zeros if necessary) and replace each 3-bit group with its single octal digit.`;
      } else if (fromBase === '2' && toBase === '16') {
        shortcutTip = `<strong>Direct Grouping Shortcut (4 Bits = 1 Hex Digit):</strong> Since 2⁴ = 16, group the binary bits into clusters of 4 (nibbles) from right to left and replace each 4-bit nibble directly with its hexadecimal digit.`;
      } else if (fromBase === '8' && toBase === '2') {
        shortcutTip = `<strong>Direct Grouping Shortcut (1 Octal Digit = 3 Bits):</strong> Since 8 = 2³, expand each octal digit directly into its 3-bit binary equivalent (e.g. 3₈ = 011₂, 1₈ = 001₂ → 011001₂ = 11001₂).`;
      } else if (fromBase === '16' && toBase === '2') {
        shortcutTip = `<strong>Direct Grouping Shortcut (1 Hex Digit = 4 Bits):</strong> Since 16 = 2⁴, expand each hexadecimal digit directly into its 4-bit binary equivalent (nibble).`;
      } else if (fromBase === '8' && toBase === '16') {
        shortcutTip = `<strong>Power-of-Two Shortcut:</strong> Both bases are powers of 2 (8 = 2³, 16 = 2⁴). You can convert Octal → Binary (3 bits per digit) and then group the resulting binary bits into 4-bit nibbles for Hexadecimal.`;
      } else if (fromBase === '16' && toBase === '8') {
        shortcutTip = `<strong>Power-of-Two Shortcut:</strong> Both bases are powers of 2 (16 = 2⁴, 8 = 2³). You can convert Hexadecimal → Binary (4 bits per digit) and then group the binary bits into 3-bit clusters for Octal.`;
      }

      html += `
        <!-- Overview of Conversion Path -->
        <div class="step-box" style="background-color:#eff6ff; border-color:#bfdbfe;">
          <div class="step-box-header">
            <span class="step-num-pill" style="background-color:#2563eb;">Conversion Path</span>
            <span class="step-box-title">${fromName.split(' ')[0]} ⟶ Decimal ⟶ ${toName.split(' ')[0]}</span>
          </div>
          <p class="step-box-desc" style="color:#1e40af;">
            We convert from <strong>${fromName}</strong> to intermediate <strong>Decimal (Base 10)</strong> via Positional Expansion, and then convert that Decimal value to <strong>${toName}</strong> via Repeated Division.
          </p>
        </div>

        <!-- Step 1: Positional Expansion to Decimal -->
        <div class="step-box">
          <div class="step-box-header">
            <span class="step-num-pill">Step 1</span>
            <span class="step-box-title">Convert ${cleanUpper}${fromSub} to Decimal (Base 10)</span>
          </div>
          <p class="step-box-desc">
            Positional weight expansion using Radix ${fromBase}:
          </p>
          <div class="expansion-math-box">
            <div class="expansion-line">${cleanUpper}${fromSub} = ${expData.termsFormula.join(' + ')}</div>
            ${expData.termsSubstituted ? `<div class="expansion-line">= ${expData.termsSubstituted.join(' + ')}</div>` : ''}
            <div class="expansion-line">= ${expData.termsValues.join(' + ')}</div>
            <div class="expansion-line highlight">= ${decimalBigInt.toString(10)}₁₀</div>
          </div>
        </div>

        <!-- Step 2: Decimal to Target Base via Repeated Division -->
        <div class="step-box">
          <div class="step-box-header">
            <span class="step-num-pill">Step 2</span>
            <span class="step-box-title">Convert ${decimalBigInt.toString(10)}₁₀ to Base ${toBase} (${toName.split(' ')[0]})</span>
          </div>
          <p class="step-box-desc">
            Repeated integer division of <strong>${decimalBigInt.toString(10)}</strong> by <strong>${toBase}</strong>:
          </p>
          <div class="division-table-wrap">
            <table class="division-table">
              <thead>
                <tr>
                  <th>Division Operation</th>
                  <th>Quotient</th>
                  <th>Remainder</th>
                  ${toBase === '16' ? '<th>Hex Digit</th>' : ''}
                </tr>
              </thead>
              <tbody>
                ${tableRowsHtml}
              </tbody>
            </table>
          </div>
          <div class="division-arrow-box">
            <span>⬆ Read remainders from bottom to top:</span>
            <strong style="font-family:var(--font-mono); font-size:0.95rem; letter-spacing:1px;">${outputStr}</strong>
          </div>
        </div>

        <!-- Step 3: Viva Shortcut Note -->
        ${shortcutTip ? `
        <div class="step-box">
          <div class="step-box-header">
            <span class="step-num-pill" style="background-color:#f59e0b;">Step 3</span>
            <span class="step-box-title">Direct Binary Bit-Grouping Relationship</span>
          </div>
          <div class="steps-viva-tip" style="margin-top:0;">
            ${shortcutTip}
          </div>
        </div>
        ` : ''}

        <!-- Final Result -->
        <div class="step-box final-result-box">
          <div class="step-box-header">
            <span class="step-num-pill" style="background-color:#10b981;">Final Result</span>
            <span class="step-box-title">Radix Equivalence</span>
          </div>
          <div class="final-result-val">${cleanUpper}${fromSub} = ${outputStr}${toSub}</div>
          <div class="steps-viva-tip">
            <strong>Viva Concept:</strong> In CPU hardware, arithmetic logic units natively represent numbers in pure binary, while Octal and Hexadecimal serve as convenient human shorthands for binary bit clusters. ${vivaBitNote}
          </div>
        </div>
      `;
    }

    // CASE 4: SAME BASE (fromBase === toBase)
    else {
      html += `
        <div class="step-box">
          <div class="step-box-header">
            <span class="step-num-pill">Step 1</span>
            <span class="step-box-title">Identical Radix (${fromBase})</span>
          </div>
          <p class="step-box-desc">
            Both the input number system and output number system have identical base radix <strong>${fromBase}</strong> (${fromName}). No numerical transformation is required.
          </p>
        </div>

        <div class="step-box final-result-box">
          <div class="step-box-header">
            <span class="step-num-pill" style="background-color:#10b981;">Final Result</span>
            <span class="step-box-title">Radix Equivalence</span>
          </div>
          <div class="final-result-val">${cleanUpper}${fromSub} = ${outputStr}${toSub}</div>
        </div>
      `;
    }

    stepsBody.innerHTML = html;
  }

  // Execute Number Conversion
  function convertNumber() {
    const rawVal = converterInput.value;
    const fromBase = inputBaseSelect.value;
    const toBase = outputBaseSelect.value;

    converterError.classList.add('hidden');
    converterOutput.value = '';

    if (!rawVal.trim()) {
      if (stepsToggleContainer) stepsToggleContainer.classList.add('hidden');
      if (conversionStepsCard) conversionStepsCard.classList.add('hidden');
      setStepsVisibility(false);
      return;
    }

    const validation = validateNumber(rawVal, fromBase);
    if (!validation.isValid) {
      converterErrorMsg.textContent = validation.error;
      converterError.classList.remove('hidden');
      if (stepsToggleContainer) stepsToggleContainer.classList.add('hidden');
      if (conversionStepsCard) conversionStepsCard.classList.add('hidden');
      setStepsVisibility(false);
      return;
    }

    try {
      const bigIntVal = parseToBigInt(validation.cleaned, fromBase);
      // Convert to target base in uppercase for hex
      const convertedResult = bigIntVal.toString(parseInt(toBase, 10)).toUpperCase();
      converterOutput.value = convertedResult;

      // Render step-by-step conversion breakdown
      buildConversionSteps(validation.cleaned, fromBase, convertedResult, toBase, bigIntVal);

      // Make toggle button visible
      if (stepsToggleContainer) {
        stepsToggleContainer.classList.remove('hidden');
      }

      // If user had previously opened steps, keep card visible and updated
      if (areConversionStepsVisible && conversionStepsCard) {
        conversionStepsCard.classList.remove('hidden');
      }
    } catch (err) {
      converterErrorMsg.textContent = 'Conversion error: ' + err.message;
      converterError.classList.remove('hidden');
      if (stepsToggleContainer) stepsToggleContainer.classList.add('hidden');
      if (conversionStepsCard) conversionStepsCard.classList.add('hidden');
      setStepsVisibility(false);
    }
  }

  // Swap Input and Output Bases
  function swapBases() {
    const oldInputBase = inputBaseSelect.value;
    const oldOutputBase = outputBaseSelect.value;
    const currentResult = converterOutput.value;

    inputBaseSelect.value = oldOutputBase;
    outputBaseSelect.value = oldInputBase;
    updateInputHelper();

    if (currentResult) {
      converterInput.value = currentResult;
      convertNumber();
    } else {
      convertNumber();
    }
    showToast('Swapped number systems!');
  }

  // Clear Converter
  function clearConverter() {
    converterInput.value = '';
    converterOutput.value = '';
    converterError.classList.add('hidden');
    if (stepsToggleContainer) stepsToggleContainer.classList.add('hidden');
    if (conversionStepsCard) conversionStepsCard.classList.add('hidden');
    setStepsVisibility(false);
    converterInput.focus();
  }

  // Copy result to clipboard
  function copyResult() {
    const res = converterOutput.value;
    if (!res) {
      showToast('No result to copy!');
      return;
    }
    navigator.clipboard.writeText(res).then(() => {
      showToast('Result copied to clipboard!');
    }).catch(() => {
      showToast('Copied: ' + res);
    });
  }

  // Event Listeners for Converter
  if (convertBtn) convertBtn.addEventListener('click', convertNumber);
  if (swapBasesBtn) swapBasesBtn.addEventListener('click', swapBases);
  if (clearConverterBtn) clearConverterBtn.addEventListener('click', clearConverter);
  if (clearInputBtn) clearInputBtn.addEventListener('click', () => {
    converterInput.value = '';
    converterOutput.value = '';
    converterError.classList.add('hidden');
    if (stepsToggleContainer) stepsToggleContainer.classList.add('hidden');
    if (conversionStepsCard) conversionStepsCard.classList.add('hidden');
    setStepsVisibility(false);
    converterInput.focus();
  });
  if (copyResultBtn) copyResultBtn.addEventListener('click', copyResult);

  if (toggleStepsBtn) {
    toggleStepsBtn.addEventListener('click', () => {
      setStepsVisibility(!areConversionStepsVisible);
    });
  }

  // Live conversion as user types
  converterInput.addEventListener('input', () => {
    convertNumber();
  });

  inputBaseSelect.addEventListener('change', () => {
    updateInputHelper();
    convertNumber();
  });

  outputBaseSelect.addEventListener('change', () => {
    convertNumber();
  });

  // Preset chips
  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const base = btn.getAttribute('data-base');
      const val = btn.getAttribute('data-val');
      inputBaseSelect.value = base;
      updateInputHelper();
      converterInput.value = val;
      convertNumber();
    });
  });

  // Initial conversion setup
  updateInputHelper();
  converterInput.value = '25';
  convertNumber();

  /* ==========================================================================
     4. TOOL 2: ADDRESS INSTRUCTION GENERATOR
     ========================================================================== */
  const exprInput = document.getElementById('exprInput');
  const archSelect = document.getElementById('archSelect');
  const destVarInput = document.getElementById('destVarInput');
  const generateInstructionsBtn = document.getElementById('generateInstructionsBtn');
  const clearGeneratorBtn = document.getElementById('clearGeneratorBtn');
  const clearExprBtn = document.getElementById('clearExprBtn');
  const generatorError = document.getElementById('generatorError');
  const generatorErrorMsg = document.getElementById('generatorErrorMsg');
  const parsedInfix = document.getElementById('parsedInfix');
  const parsedPostfix = document.getElementById('parsedPostfix');
  const instructionOutputArea = document.getElementById('instructionOutputArea');
  const exprChips = document.querySelectorAll('.expr-chip');

  // Operator metadata
  const PRECEDENCE = { '^': 4, '*': 3, '/': 3, '+': 2, '-': 2 };
  const RIGHT_ASSOCIATIVE = { '^': true };
  const OP_NAMES = { '+': 'ADD', '-': 'SUB', '*': 'MUL', '/': 'DIV', '^': 'POW' };
  const OP_SYMBOLS = { 'ADD': '+', 'SUB': '-', 'MUL': '*', 'DIV': '/', 'POW': '^' };

  /**
   * Tokenizer: Breaks arithmetic expression into operands, operators, parentheses.
   */
  function tokenizeExpression(expr) {
    const tokens = [];
    let i = 0;
    const cleanExpr = expr.replace(/\s+/g, '');
    
    if (!cleanExpr) {
      throw new Error('Please enter an arithmetic expression.');
    }

    while (i < cleanExpr.length) {
      const ch = cleanExpr[i];

      // Alphanumeric identifier or number (e.g. A, B, R1, 25)
      if (/[a-zA-Z0-9_]/.test(ch)) {
        let identifier = '';
        while (i < cleanExpr.length && /[a-zA-Z0-9_]/.test(cleanExpr[i])) {
          identifier += cleanExpr[i];
          i++;
        }
        tokens.push({ type: 'operand', value: identifier });
      } else if (['+', '-', '*', '/', '^', '(', ')'].includes(ch)) {
        tokens.push({ type: 'operator', value: ch });
        i++;
      } else {
        throw new Error(`Unexpected character '${ch}' in expression.`);
      }
    }

    // Basic structural validation
    let parenCount = 0;
    for (let k = 0; k < tokens.length; k++) {
      const t = tokens[k];
      if (t.value === '(') parenCount++;
      if (t.value === ')') parenCount--;
      if (parenCount < 0) throw new Error('Mismatched closing parenthesis without matching opening.');

      // Check consecutive operators
      if (k > 0 && t.type === 'operator' && !['(', ')'].includes(t.value)) {
        const prev = tokens[k - 1];
        if (prev.type === 'operator' && !['(', ')'].includes(prev.value)) {
          throw new Error(`Consecutive operators '${prev.value}' and '${t.value}' are not allowed.`);
        }
      }
    }
    if (parenCount !== 0) {
      throw new Error('Mismatched parentheses! Ensure every "(" has a matching ")".');
    }

    return tokens;
  }

  /**
   * Shunting-yard Algorithm: Infix to Postfix (Reverse Polish Notation)
   */
  function infixToPostfix(tokens) {
    const output = [];
    const opStack = [];

    for (const token of tokens) {
      if (token.type === 'operand') {
        output.push(token);
      } else if (token.value === '(') {
        opStack.push(token);
      } else if (token.value === ')') {
        while (opStack.length > 0 && opStack[opStack.length - 1].value !== '(') {
          output.push(opStack.pop());
        }
        if (opStack.length === 0) {
          throw new Error('Mismatched parentheses.');
        }
        opStack.pop(); // Discard '('
      } else {
        // Operator
        const op1 = token.value;
        while (opStack.length > 0 && opStack[opStack.length - 1].value !== '(') {
          const op2 = opStack[opStack.length - 1].value;
          const p1 = PRECEDENCE[op1];
          const p2 = PRECEDENCE[op2];
          if (p2 > p1 || (p2 === p1 && !RIGHT_ASSOCIATIVE[op1])) {
            output.push(opStack.pop());
          } else {
            break;
          }
        }
        opStack.push(token);
      }
    }

    while (opStack.length > 0) {
      const top = opStack.pop();
      if (top.value === '(' || top.value === ')') {
        throw new Error('Mismatched parentheses in expression.');
      }
      output.push(top);
    }

    return output;
  }

  /**
   * Builds an Abstract Syntax Tree (AST) from Postfix tokens.
   */
  function buildAST(postfixTokens) {
    const stack = [];
    for (const token of postfixTokens) {
      if (token.type === 'operand') {
        stack.push({ type: 'operand', value: token.value, isLeaf: true });
      } else {
        if (stack.length < 2) {
          throw new Error(`Incomplete expression near operator '${token.value}'.`);
        }
        const right = stack.pop();
        const left = stack.pop();
        stack.push({
          type: 'operator',
          op: token.value,
          left,
          right,
          isLeaf: false
        });
      }
    }

    if (stack.length !== 1) {
      throw new Error('Malformed expression: extra operands found.');
    }
    return stack[0];
  }

  /**
   * 0-Address Instruction Generator (Stack Architecture)
   */
  function generateZeroAddress(postfixTokens, targetVar = 'X') {
    const lines = [];
    const explanations = [];

    for (const token of postfixTokens) {
      if (token.type === 'operand') {
        lines.push({ opcode: 'PUSH', operand: token.value });
        explanations.push(`PUSH ${token.value} → Push operand '${token.value}' onto Top of Stack (TOS)`);
      } else {
        const opCode = OP_NAMES[token.value] || token.value;
        lines.push({ opcode: opCode, operand: '' });
        explanations.push(`${opCode} → Pop top two operands, compute (${token.value}), push result to TOS`);
      }
    }

    return {
      name: '0-Address (Stack Architecture)',
      badge: '0-Address',
      count: lines.length,
      lines,
      explanations,
      description: 'Stack architecture evaluation directly models postfix (Reverse Polish) notation. Operands are implicitly retrieved from and saved to the Top of Stack (TOS) without memory address fields in ALU instructions.'
    };
  }

  /**
   * 1-Address Instruction Generator (Accumulator Architecture)
   */
  function generateOneAddress(ast, targetVar = 'X') {
    const lines = [];
    const explanations = [];
    let tempCounter = 0;

    function isComplex(node) {
      return !node.isLeaf;
    }

    function evaluate(node) {
      if (node.isLeaf) return node.value;

      const opCode = OP_NAMES[node.op] || node.op;
      const isCommutative = ['+', '*'].includes(node.op);

      // Sub-case 1: Both operands are single leaves
      if (!isComplex(node.left) && !isComplex(node.right)) {
        lines.push({ opcode: 'LOAD', operand: node.left.value });
        explanations.push(`LOAD ${node.left.value} → AC = ${node.left.value}`);
        lines.push({ opcode: opCode, operand: node.right.value });
        explanations.push(`${opCode} ${node.right.value} → AC = AC ${node.op} ${node.right.value}`);
        return null;
      }

      // Sub-case 2: Left is complex subtree, Right is leaf
      if (isComplex(node.left) && !isComplex(node.right)) {
        evaluate(node.left); // Leaves result in AC
        lines.push({ opcode: opCode, operand: node.right.value });
        explanations.push(`${opCode} ${node.right.value} → AC = AC ${node.op} ${node.right.value}`);
        return null;
      }

      // Sub-case 3: Left is leaf, Right is complex subtree
      if (!isComplex(node.left) && isComplex(node.right)) {
        if (isCommutative) {
          evaluate(node.right); // AC has right subtree result
          lines.push({ opcode: opCode, operand: node.left.value });
          explanations.push(`${opCode} ${node.left.value} → AC = AC ${node.op} ${node.left.value}`);
        } else {
          evaluate(node.right);
          tempCounter++;
          const temp = `T${tempCounter}`;
          lines.push({ opcode: 'STORE', operand: temp });
          explanations.push(`STORE ${temp} → Memory[${temp}] = AC (save right subexpression)`);
          lines.push({ opcode: 'LOAD', operand: node.left.value });
          explanations.push(`LOAD ${node.left.value} → AC = ${node.left.value}`);
          lines.push({ opcode: opCode, operand: temp });
          explanations.push(`${opCode} ${temp} → AC = AC ${node.op} ${temp}`);
        }
        return null;
      }

      // Sub-case 4: Both are complex subtrees
      evaluate(node.left);
      tempCounter++;
      const temp1 = `T${tempCounter}`;
      lines.push({ opcode: 'STORE', operand: temp1 });
      explanations.push(`STORE ${temp1} → Memory[${temp1}] = AC (save left subexpression)`);

      evaluate(node.right);

      if (isCommutative) {
        lines.push({ opcode: opCode, operand: temp1 });
        explanations.push(`${opCode} ${temp1} → AC = AC ${node.op} ${temp1}`);
      } else {
        tempCounter++;
        const temp2 = `T${tempCounter}`;
        lines.push({ opcode: 'STORE', operand: temp2 });
        explanations.push(`STORE ${temp2} → Memory[${temp2}] = AC (save right subexpression)`);
        lines.push({ opcode: 'LOAD', operand: temp1 });
        explanations.push(`LOAD ${temp1} → AC = ${temp1} (reload left subexpression)`);
        lines.push({ opcode: opCode, operand: temp2 });
        explanations.push(`${opCode} ${temp2} → AC = AC ${node.op} ${temp2}`);
      }
      return null;
    }

    evaluate(ast);
    lines.push({ opcode: 'STORE', operand: targetVar });
    explanations.push(`STORE ${targetVar} → Memory[${targetVar}] = AC (store final computation result)`);

    return {
      name: '1-Address (Accumulator Architecture)',
      badge: '1-Address',
      count: lines.length,
      lines,
      explanations,
      description: 'Single Accumulator (AC) register architecture. All ALU operations implicitly reference the AC as both a source and destination operand. Complex subexpressions are temporarily saved to memory locations (T1, T2).'
    };
  }

  /**
   * 2-Address Instruction Generator
   */
  function generateTwoAddress(ast, targetVar = 'X') {
    const lines = [];
    const explanations = [];
    let regCounter = 0;

    function evaluate(node) {
      if (node.isLeaf) {
        return { isReg: false, name: node.value };
      }

      const left = evaluate(node.left);
      const right = evaluate(node.right);
      const opCode = OP_NAMES[node.op] || node.op;

      let destReg;
      if (!left.isReg) {
        regCounter++;
        destReg = `R${regCounter}`;
        lines.push({ opcode: 'MOV', operand: `${destReg}, ${left.name}` });
        explanations.push(`MOV ${destReg}, ${left.name} → Load ${left.name} into register ${destReg}`);
      } else {
        destReg = left.name;
      }

      const src = right.isReg ? right.name : right.name;
      lines.push({ opcode: opCode, operand: `${destReg}, ${src}` });
      explanations.push(`${opCode} ${destReg}, ${src} → ${destReg} = ${destReg} ${node.op} ${src}`);

      return { isReg: true, name: destReg };
    }

    const rootRes = evaluate(ast);
    lines.push({ opcode: 'MOV', operand: `${targetVar}, ${rootRes.name}` });
    explanations.push(`MOV ${targetVar}, ${rootRes.name} → Store final result from ${rootRes.name} into destination variable ${targetVar}`);

    return {
      name: '2-Address (Destination-as-Source Architecture)',
      badge: '2-Address',
      count: lines.length,
      lines,
      explanations,
      description: 'Two-address instructions utilize two register/memory fields. The first operand acts both as the destination and one source operand (Dest = Dest OP Src). A MOV instruction transfers initial variables into working registers.'
    };
  }

  /**
   * 3-Address Instruction Generator
   */
  function generateThreeAddress(ast, targetVar = 'X') {
    const lines = [];
    const explanations = [];
    let regCounter = 0;

    function evaluate(node, isRoot = false) {
      if (node.isLeaf) return node.value;

      const leftVal = evaluate(node.left, false);
      const rightVal = evaluate(node.right, false);
      const opCode = OP_NAMES[node.op] || node.op;

      let dest;
      if (isRoot) {
        dest = targetVar;
      } else {
        regCounter++;
        dest = `R${regCounter}`;
      }

      lines.push({ opcode: opCode, operand: `${dest}, ${leftVal}, ${rightVal}` });
      explanations.push(`${dest} = ${leftVal} ${node.op} ${rightVal}`);
      return dest;
    }

    evaluate(ast, true);

    return {
      name: '3-Address (General Register Architecture)',
      badge: '3-Address',
      count: lines.length,
      lines,
      explanations,
      description: 'Three-address instructions specify three distinct addresses: one destination and two independent source operands (Dest = Src1 OP Src2). Achieves the lowest instruction count at the cost of wider instruction word encoding.'
    };
  }

  /**
   * Render instruction bundle into HTML
   */
  function renderBundleHTML(bundle) {
    let codeHtml = '';
    bundle.lines.forEach((line, idx) => {
      codeHtml += `<div class="code-line">
        <span class="line-num">${idx + 1}</span>
        <span class="line-text">
          <span class="line-opcode">${line.opcode}</span>
          ${line.operand ? `<span class="line-operand">&nbsp;${line.operand}</span>` : ''}
        </span>
      </div>`;
    });

    let expHtml = '';
    bundle.explanations.forEach((exp, idx) => {
      expHtml += `<div class="exp-step-line">
        <span class="exp-step-num">${idx + 1}.</span>
        <span>${exp}</span>
      </div>`;
    });

    return `
      <div class="instruction-panel">
        <div class="inst-panel-header">
          <div class="inst-panel-title">
            <span class="inst-badge">${bundle.badge}</span>
            <h4>${bundle.name}</h4>
          </div>
          <span class="inst-count-pill">${bundle.count} Instructions</span>
        </div>
        <div class="inst-code-body">
          <div class="code-listing">
            ${codeHtml}
          </div>
          <div class="explanation-listing">
            ${expHtml}
          </div>
        </div>
        <div class="inst-panel-footer">
          💡 ${bundle.description}
        </div>
      </div>
    `;
  }

  /**
   * Main Generator Coordinator
   */
  function generateInstructions() {
    const rawExpr = exprInput.value.trim();
    const selectedArch = archSelect.value;
    const targetVar = (destVarInput.value.trim() || 'X').toUpperCase();

    generatorError.classList.add('hidden');
    instructionOutputArea.innerHTML = '';

    if (!rawExpr) {
      generatorErrorMsg.textContent = 'Please enter an arithmetic expression.';
      generatorError.classList.remove('hidden');
      return;
    }

    try {
      const tokens = tokenizeExpression(rawExpr);
      const postfixTokens = infixToPostfix(tokens);
      const ast = buildAST(postfixTokens);

      // Display parsed infix and postfix
      parsedInfix.textContent = rawExpr;
      parsedPostfix.textContent = postfixTokens.map(t => t.value).join(' ');

      const bundles = [];

      if (selectedArch === 'all' || selectedArch === '3') {
        bundles.push(generateThreeAddress(ast, targetVar));
      }
      if (selectedArch === 'all' || selectedArch === '2') {
        bundles.push(generateTwoAddress(ast, targetVar));
      }
      if (selectedArch === 'all' || selectedArch === '1') {
        bundles.push(generateOneAddress(ast, targetVar));
      }
      if (selectedArch === 'all' || selectedArch === '0') {
        bundles.push(generateZeroAddress(postfixTokens, targetVar));
      }

      let completeHtml = '';
      bundles.forEach(b => {
        completeHtml += renderBundleHTML(b);
      });

      instructionOutputArea.innerHTML = completeHtml;

      // Update simulation bundle cache
      currentGeneratedBundles = bundles;
      currentExpression = rawExpr;
      currentTargetVar = targetVar;

      if (bundles.length > 0) {
        if (visualizeTriggerContainer) {
          visualizeTriggerContainer.classList.remove('hidden');
        }
        // If the execution simulator is currently open, keep it in sync
        if (visualExecutionContainer && !visualExecutionContainer.classList.contains('hidden')) {
          setupSimulation(0);
        }
      } else {
        if (visualizeTriggerContainer) visualizeTriggerContainer.classList.add('hidden');
        if (visualExecutionContainer) visualExecutionContainer.classList.add('hidden');
        pauseSimulation();
      }
    } catch (err) {
      generatorErrorMsg.textContent = err.message;
      generatorError.classList.remove('hidden');
      instructionOutputArea.innerHTML = '';
      if (visualizeTriggerContainer) visualizeTriggerContainer.classList.add('hidden');
      if (visualExecutionContainer) visualExecutionContainer.classList.add('hidden');
      pauseSimulation();
    }
  }

  // Clear Generator
  function clearGenerator() {
    exprInput.value = '';
    instructionOutputArea.innerHTML = '';
    parsedInfix.textContent = '—';
    parsedPostfix.textContent = '—';
    generatorError.classList.add('hidden');
    if (visualizeTriggerContainer) visualizeTriggerContainer.classList.add('hidden');
    if (visualExecutionContainer) visualExecutionContainer.classList.add('hidden');
    pauseSimulation();
    exprInput.focus();
  }

  // HTML escaping utility
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ==========================================================================
     VISUAL EXECUTION SIMULATOR ENGINE
     ========================================================================== */
  const visualizeTriggerContainer = document.getElementById('visualizeTriggerContainer');
  const startVisualizerBtn = document.getElementById('startVisualizerBtn');
  const visualExecutionContainer = document.getElementById('visualExecutionContainer');
  const simArchSwitcher = document.getElementById('simArchSwitcher');
  const simExprDisplay = document.getElementById('simExprDisplay');
  const simTargetDisplay = document.getElementById('simTargetDisplay');
  const simStepIndicator = document.getElementById('simStepIndicator');
  const simProgressFill = document.getElementById('simProgressFill');
  const simHeroBadge = document.getElementById('simHeroBadge');
  const simHeroFormatTag = document.getElementById('simHeroFormatTag');
  const simHeroOpcode = document.getElementById('simHeroOpcode');
  const simHeroOperand = document.getElementById('simHeroOperand');
  const simSemanticCode = document.getElementById('simSemanticCode');
  const simDataflowCanvas = document.getElementById('simDataflowCanvas');
  const simHardwareNote = document.getElementById('simHardwareNote');
  const simHardwareBoard = document.getElementById('simHardwareBoard');
  const simExpText = document.getElementById('simExpText');
  const simVivaTip = document.getElementById('simVivaTip');
  const simCompleteBanner = document.getElementById('simCompleteBanner');
  const simCompleteMsg = document.getElementById('simCompleteMsg');
  const simCompleteTarget = document.getElementById('simCompleteTarget');
  const simPrevBtn = document.getElementById('simPrevBtn');
  const simPlayBtn = document.getElementById('simPlayBtn');
  const simPlayIcon = document.getElementById('simPlayIcon');
  const simPlayText = document.getElementById('simPlayText');
  const simNextBtn = document.getElementById('simNextBtn');
  const simResetBtn = document.getElementById('simResetBtn');

  let currentGeneratedBundles = [];
  let currentExpression = '';
  let currentTargetVar = 'X';
  let activeBundleIndex = 0;
  let simSteps = [];
  let simCurrentStep = 0;
  let simPlayTimer = null;
  let simIsPlaying = false;

  /**
   * Builds step-by-step hardware simulation records for an instruction bundle
   */
  function buildSimulationSteps(bundle, targetVar) {
    const steps = [];
    const badge = bundle.badge;
    const lines = bundle.lines;

    if (!lines || lines.length === 0) return steps;

    if (badge === '3-Address') {
      const regSet = new Set();
      lines.forEach(l => {
        const parts = l.operand.split(',').map(s => s.trim());
        parts.forEach(p => {
          if (p.startsWith('R') || p === targetVar) regSet.add(p);
        });
      });
      const regList = Array.from(regSet).sort((a, b) => {
        if (a === targetVar) return 1;
        if (b === targetVar) return -1;
        const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
      });

      const regState = {};
      regList.forEach(r => { regState[r] = '—'; });

      lines.forEach((line, idx) => {
        const parts = line.operand.split(',').map(s => s.trim());
        const dest = parts[0];
        const src1 = parts[1];
        const src2 = parts[2];
        const opSymbol = OP_SYMBOLS[line.opcode] || line.opcode;

        const val1 = (regState[src1] && regState[src1] !== '—') ? regState[src1] : src1;
        const val2 = (regState[src2] && regState[src2] !== '—') ? regState[src2] : src2;
        const needsParen = (val1.includes(' ') || val2.includes(' '));
        const resVal = needsParen ? `(${val1} ${opSymbol} ${val2})` : `${val1} ${opSymbol} ${val2}`;
        regState[dest] = resVal;

        const snapshot = Object.assign({}, regState);
        const isFinal = (idx === lines.length - 1);

        steps.push({
          stepNum: idx + 1,
          totalSteps: lines.length,
          opcode: line.opcode,
          operand: line.operand,
          formatTag: '3-Address (General Register Architecture)',
          semantic: `${dest} = ${src1} ${opSymbol} ${src2}`,
          dataflowHtml: `
            <div class="df-chip df-operand">${escapeHtml(src1)}</div>
            <div class="df-chip df-op-badge">${escapeHtml(opSymbol)}</div>
            <div class="df-chip df-operand">${escapeHtml(src2)}</div>
            <div class="df-arrow-box">⟶ ALU ⟶</div>
            <div class="df-chip df-target"><strong>${escapeHtml(dest)}</strong></div>
          `,
          hardwareNote: 'General-Purpose Register Bank',
          hardwareHtml: renderRegisterGrid(regList, snapshot, dest, [src1, src2], targetVar),
          explanation: `The ALU fetches source operands <strong>${escapeHtml(src1)}</strong> and <strong>${escapeHtml(src2)}</strong>, executes the <strong>${escapeHtml(line.opcode)}</strong> (${opSymbol}) operation, and stores the computed result directly into destination register <strong>${escapeHtml(dest)}</strong>.`,
          vivaTip: `<strong>Viva Concept:</strong> In 3-Address format, instructions encode one destination and two distinct source addresses (<code>Dest = Src1 OP Src2</code>). Source operands remain unmodified, preserving data without extra register moves.`,
          isFinal
        });
      });
    } else if (badge === '2-Address') {
      const regSet = new Set();
      lines.forEach(l => {
        const parts = l.operand.split(',').map(s => s.trim());
        parts.forEach(p => {
          if (p.startsWith('R') || p === targetVar) regSet.add(p);
        });
      });
      const regList = Array.from(regSet).sort((a, b) => {
        if (a === targetVar) return 1;
        if (b === targetVar) return -1;
        const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
      });

      const regState = {};
      regList.forEach(r => { regState[r] = '—'; });

      lines.forEach((line, idx) => {
        const parts = line.operand.split(',').map(s => s.trim());
        const dest = parts[0];
        const src = parts[1];
        const isFinal = (idx === lines.length - 1);

        if (line.opcode === 'MOV') {
          const valSrc = (regState[src] && regState[src] !== '—') ? regState[src] : src;
          regState[dest] = valSrc;
          const snapshot = Object.assign({}, regState);

          steps.push({
            stepNum: idx + 1,
            totalSteps: lines.length,
            opcode: 'MOV',
            operand: line.operand,
            formatTag: '2-Address (Destination-as-Source Architecture)',
            semantic: `${dest} ← ${src}`,
            dataflowHtml: `
              <div class="df-chip df-operand">${escapeHtml(src)}</div>
              <div class="df-arrow-box">──(Data Transfer)──►</div>
              <div class="df-chip df-target"><strong>${escapeHtml(dest)}</strong></div>
            `,
            hardwareNote: 'General-Purpose Working Registers',
            hardwareHtml: renderRegisterGrid(regList, snapshot, dest, [src], targetVar),
            explanation: `Transfers operand <strong>${escapeHtml(src)}</strong> into register <strong>${escapeHtml(dest)}</strong>. In 2-Address architecture, one register must be loaded with the first operand before arithmetic instructions can operate on it.`,
            vivaTip: `<strong>Viva Concept:</strong> Because one operand serves both as source and destination in 2-address machines, an explicit <code>MOV</code> instruction is necessary to preserve original values.`,
            isFinal
          });
        } else {
          const opSymbol = OP_SYMBOLS[line.opcode] || line.opcode;
          const valDest = (regState[dest] && regState[dest] !== '—') ? regState[dest] : dest;
          const valSrc = (regState[src] && regState[src] !== '—') ? regState[src] : src;
          const needsParen = (valDest.includes(' ') || valSrc.includes(' '));
          const resVal = needsParen ? `(${valDest} ${opSymbol} ${valSrc})` : `${valDest} ${opSymbol} ${valSrc}`;
          regState[dest] = resVal;
          const snapshot = Object.assign({}, regState);

          steps.push({
            stepNum: idx + 1,
            totalSteps: lines.length,
            opcode: line.opcode,
            operand: line.operand,
            formatTag: '2-Address (Destination-as-Source Architecture)',
            semantic: `${dest} = ${dest} ${opSymbol} ${src}`,
            dataflowHtml: `
              <div class="df-chip df-operand">${escapeHtml(dest)} (Dest)</div>
              <div class="df-chip df-op-badge">${escapeHtml(opSymbol)}</div>
              <div class="df-chip df-operand">${escapeHtml(src)} (Src)</div>
              <div class="df-arrow-box">⟶ ALU ⟶</div>
              <div class="df-chip df-target"><strong>${escapeHtml(dest)} (New)</strong></div>
            `,
            hardwareNote: 'General-Purpose Working Registers',
            hardwareHtml: renderRegisterGrid(regList, snapshot, dest, [dest, src], targetVar),
            explanation: `ALU executes <strong>${dest} ${opSymbol} ${src}</strong> and writes the outcome back into register <strong>${escapeHtml(dest)}</strong>. Notice that register <strong>${escapeHtml(dest)}</strong> acts both as the first operand and the destination!`,
            vivaTip: `<strong>Viva Concept:</strong> 2-Address format reduces instruction width by using only 2 address fields (<code>Dest = Dest OP Src</code>), but overwrites one of the input operands destructively.`,
            isFinal
          });
        }
      });
    } else if (badge === '1-Address') {
      const memSet = new Set();
      lines.forEach(l => {
        const op = l.operand ? l.operand.trim() : '';
        if (op.startsWith('T') || op === targetVar) memSet.add(op);
      });
      const memList = Array.from(memSet).sort((a, b) => {
        if (a === targetVar) return 1;
        if (b === targetVar) return -1;
        const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
        return numA - numB;
      });

      let ac = '—';
      const memState = {};
      memList.forEach(m => { memState[m] = '—'; });

      lines.forEach((line, idx) => {
        const op = line.opcode;
        const operand = line.operand ? line.operand.trim() : '';
        const isFinal = (idx === lines.length - 1);

        if (op === 'LOAD') {
          const val = (memState[operand] && memState[operand] !== '—') ? memState[operand] : operand;
          ac = val;
          const snapshotMem = Object.assign({}, memState);

          steps.push({
            stepNum: idx + 1,
            totalSteps: lines.length,
            opcode: 'LOAD',
            operand: operand,
            formatTag: '1-Address (Accumulator Architecture)',
            semantic: `AC ← Memory[${operand}]`,
            dataflowHtml: `
              <div class="df-chip df-operand">Memory [${escapeHtml(operand)}]</div>
              <div class="df-arrow-box">──(LOAD)──►</div>
              <div class="df-chip df-target"><strong>Accumulator (AC)</strong></div>
            `,
            hardwareNote: 'Accumulator (AC) &amp; Memory Locations',
            hardwareHtml: renderAccumulatorLayout(ac, snapshotMem, memList, targetVar, null),
            explanation: `The CPU loads memory variable <strong>${escapeHtml(operand)}</strong> directly into the single Accumulator (AC) register.`,
            vivaTip: `<strong>Viva Concept:</strong> In 1-Address architecture, the Accumulator (AC) register is implicit in every instruction. Instructions only specify one memory address.`,
            isFinal
          });
        } else if (op === 'STORE') {
          memState[operand] = ac;
          const snapshotMem = Object.assign({}, memState);

          steps.push({
            stepNum: idx + 1,
            totalSteps: lines.length,
            opcode: 'STORE',
            operand: operand,
            formatTag: '1-Address (Accumulator Architecture)',
            semantic: `Memory[${operand}] ← AC`,
            dataflowHtml: `
              <div class="df-chip df-operand">Accumulator (${escapeHtml(ac)})</div>
              <div class="df-arrow-box">──(STORE)──►</div>
              <div class="df-chip df-target"><strong>Memory [${escapeHtml(operand)}]</strong></div>
            `,
            hardwareNote: 'Accumulator (AC) &amp; Memory Locations',
            hardwareHtml: renderAccumulatorLayout(ac, snapshotMem, memList, targetVar, operand),
            explanation: `Stores the current value in the Accumulator into memory location <strong>${escapeHtml(operand)}</strong>. This saves subexpressions so the Accumulator can be reused.`,
            vivaTip: `<strong>Viva Concept:</strong> Because there is only a single register (AC), intermediate subexpression results must be saved (spilled) to temporary memory locations (T1, T2) using <code>STORE</code>.`,
            isFinal
          });
        } else {
          const opSymbol = OP_SYMBOLS[op] || op;
          const valM = (memState[operand] && memState[operand] !== '—') ? memState[operand] : operand;
          const oldAC = ac;
          const needsParen = (oldAC.includes(' ') || valM.includes(' '));
          ac = needsParen ? `(${oldAC} ${opSymbol} ${valM})` : `${oldAC} ${opSymbol} ${valM}`;
          const snapshotMem = Object.assign({}, memState);

          steps.push({
            stepNum: idx + 1,
            totalSteps: lines.length,
            opcode: op,
            operand: operand,
            formatTag: '1-Address (Accumulator Architecture)',
            semantic: `AC = AC ${opSymbol} Memory[${operand}]`,
            dataflowHtml: `
              <div class="df-chip df-operand">AC (${escapeHtml(oldAC)})</div>
              <div class="df-chip df-op-badge">${escapeHtml(opSymbol)}</div>
              <div class="df-chip df-operand">Memory [${escapeHtml(operand)}]</div>
              <div class="df-arrow-box">⟶ ALU ⟶</div>
              <div class="df-chip df-target"><strong>Accumulator (AC)</strong></div>
            `,
            hardwareNote: 'Accumulator (AC) &amp; Memory Locations',
            hardwareHtml: renderAccumulatorLayout(ac, snapshotMem, memList, targetVar, null),
            explanation: `ALU calculates <strong>${escapeHtml(oldAC)} ${opSymbol} ${escapeHtml(operand)}</strong> and writes the outcome straight into the Accumulator.`,
            vivaTip: `<strong>Viva Concept:</strong> All arithmetic operations in 1-Address machines have one implicit operand (AC) and one explicit operand (from memory).`,
            isFinal
          });
        }
      });
    } else if (badge === '0-Address') {
      const stack = [];

      lines.forEach((line, idx) => {
        const op = line.opcode;
        const operand = line.operand ? line.operand.trim() : '';
        const isFinal = (idx === lines.length - 1);

        if (op === 'PUSH') {
          stack.push(operand);
          const snapshotStack = stack.slice();

          steps.push({
            stepNum: idx + 1,
            totalSteps: lines.length,
            opcode: 'PUSH',
            operand: operand,
            formatTag: '0-Address (Stack Architecture)',
            semantic: `TOS ← ${operand} (Push)`,
            dataflowHtml: `
              <div class="df-chip df-operand">Operand '${escapeHtml(operand)}'</div>
              <div class="df-arrow-box">──(PUSH)──►</div>
              <div class="df-chip df-target"><strong>Top of Stack (TOS)</strong></div>
            `,
            hardwareNote: 'Evaluation Stack Frame (LIFO)',
            hardwareHtml: renderStackLayout(snapshotStack),
            explanation: `Pushes operand <strong>${escapeHtml(operand)}</strong> onto the Top of Stack (TOS). Stack depth is now <strong>${snapshotStack.length}</strong>.`,
            vivaTip: `<strong>Viva Concept:</strong> 0-Address machines (like JVM or Burroughs B5000) evaluate expressions using a stack. <code>PUSH</code> loads operands from memory onto the stack.`,
            isFinal
          });
        } else if (op === 'POP') {
          const popped = stack.pop() || '—';
          const snapshotStack = stack.slice();
          const target = operand || targetVar;

          steps.push({
            stepNum: idx + 1,
            totalSteps: lines.length,
            opcode: 'POP',
            operand: target,
            formatTag: '0-Address (Stack Architecture)',
            semantic: `Memory[${target}] ← Pop()`,
            dataflowHtml: `
              <div class="df-chip df-operand">Pop from TOS: ${escapeHtml(popped)}</div>
              <div class="df-arrow-box">──(POP)──►</div>
              <div class="df-chip df-target"><strong>Memory [${escapeHtml(target)}]</strong></div>
            `,
            hardwareNote: 'Evaluation Stack Frame (LIFO)',
            hardwareHtml: renderStackLayout(snapshotStack),
            explanation: `Pops the evaluated expression from the Top of Stack into destination variable <strong>${escapeHtml(target)}</strong>.`,
            vivaTip: `<strong>Viva Concept:</strong> <code>POP</code> removes the top element from the stack and stores it into permanent memory.`,
            isFinal
          });
        } else {
          const opSymbol = OP_SYMBOLS[op] || op;
          const op2 = stack.pop() || '?';
          const op1 = stack.pop() || '?';
          const needsParen = (op1.includes(' ') || op2.includes(' '));
          const result = needsParen ? `(${op1} ${opSymbol} ${op2})` : `${op1} ${opSymbol} ${op2}`;
          stack.push(result);
          const snapshotStack = stack.slice();

          steps.push({
            stepNum: idx + 1,
            totalSteps: lines.length,
            opcode: op,
            operand: '',
            formatTag: '0-Address (Stack Architecture)',
            semantic: `TOS ← Pop() ${opSymbol} Pop()`,
            dataflowHtml: `
              <div class="df-chip df-operand">Pop 2: ${escapeHtml(op2)}</div>
              <div class="df-chip df-op-badge">${escapeHtml(opSymbol)}</div>
              <div class="df-chip df-operand">Pop 1: ${escapeHtml(op1)}</div>
              <div class="df-arrow-box">⟶ ALU ⟶ Push ⟶</div>
              <div class="df-chip df-target"><strong>TOS: ${escapeHtml(result)}</strong></div>
            `,
            hardwareNote: 'Evaluation Stack Frame (LIFO)',
            hardwareHtml: renderStackLayout(snapshotStack),
            explanation: `Pops the top two operands (<strong>${escapeHtml(op2)}</strong> and <strong>${escapeHtml(op1)}</strong>), computes <strong>${escapeHtml(op1)} ${opSymbol} ${escapeHtml(op2)}</strong>, and pushes the result back onto TOS.`,
            vivaTip: `<strong>Viva Concept:</strong> 0-Address arithmetic instructions have NO address fields in the opcode because both inputs and destination are implicitly the Top of Stack (TOS).`,
            isFinal
          });
        }
      });
    }

    return steps;
  }

  // Render register grid for 3-address & 2-address
  function renderRegisterGrid(regList, state, dest, sources, targetVar) {
    let html = '<div class="sim-reg-grid">';
    regList.forEach(r => {
      const isWrite = (r === dest);
      const isRead = sources.includes(r);
      const isTarget = (r === targetVar);
      let activeClass = '';
      if (isWrite) activeClass = 'active-write';
      else if (isRead) activeClass = 'active-read';

      let roleTag = 'REG';
      if (isTarget) roleTag = 'TARGET';
      else if (isWrite) roleTag = 'UPDATED';
      else if (isRead) roleTag = 'READ';

      const val = state[r] || '—';
      const isEmpty = (val === '—');

      html += `
        <div class="sim-reg-cell ${activeClass}">
          <div class="sim-reg-cell-header">
            <span class="sim-reg-name">${escapeHtml(r)}</span>
            <span class="sim-reg-tag">${roleTag}</span>
          </div>
          <div class="sim-reg-val ${isEmpty ? 'empty' : ''}" title="${escapeHtml(val)}">
            ${escapeHtml(val)}
          </div>
        </div>
      `;
    });
    html += '</div>';
    return html;
  }

  // Render accumulator layout for 1-address
  function renderAccumulatorLayout(acVal, memState, memList, targetVar, updatedMem) {
    let memCells = '';
    memList.forEach(m => {
      const isTarget = (m === targetVar);
      const isUpdated = (m === updatedMem);
      const val = memState[m] || '—';
      const isEmpty = (val === '—');
      memCells += `
        <div class="sim-reg-cell ${isUpdated ? 'active-write' : ''}">
          <div class="sim-reg-cell-header">
            <span class="sim-reg-name">${escapeHtml(m)}</span>
            <span class="sim-reg-tag">${isTarget ? 'TARGET' : 'TEMP MEM'}</span>
          </div>
          <div class="sim-reg-val ${isEmpty ? 'empty' : ''}" title="${escapeHtml(val)}">
            ${escapeHtml(val)}
          </div>
        </div>
      `;
    });

    return `
      <div class="sim-ac-layout">
        <div class="sim-ac-box active-update">
          <div class="sim-ac-header">
            <span class="sim-ac-title">Accumulator (AC)</span>
            <span class="sim-ac-badge">Working Reg</span>
          </div>
          <div class="sim-ac-value-wrap" title="${escapeHtml(acVal)}">
            ${escapeHtml(acVal)}
          </div>
          <div class="sim-ac-sub">Implicit Source &amp; Destination Register</div>
        </div>
        <div>
          <div class="sim-reg-grid sim-mem-grid">
            ${memCells || '<div class="sim-stack-empty-msg">No temporary memory spilled</div>'}
          </div>
        </div>
      </div>
    `;
  }

  // Render stack layout for 0-address
  function renderStackLayout(stack) {
    if (!stack || stack.length === 0) {
      return `
        <div class="sim-stack-layout">
          <div class="sim-stack-frame">
            <div class="sim-stack-empty-msg">Stack is currently empty (TOS: NULL)</div>
          </div>
          <div class="sim-stack-base-label">Stack Base (LIFO - Last In First Out)</div>
        </div>
      `;
    }

    let itemsHtml = '';
    stack.forEach((item, idx) => {
      const isTOS = (idx === stack.length - 1);
      itemsHtml += `
        <div class="sim-stack-item ${isTOS ? 'tos-item' : ''}">
          <span>${escapeHtml(item)}</span>
          ${isTOS ? '<span class="sim-stack-tos-badge">◀ TOP OF STACK (TOS)</span>' : `<span style="font-size:0.68rem; color:#94a3b8;">Slot ${idx}</span>`}
        </div>
      `;
    });

    return `
      <div class="sim-stack-layout">
        <div class="sim-stack-frame">
          ${itemsHtml}
        </div>
        <div class="sim-stack-base-label">Stack Base (LIFO - Last In First Out)</div>
      </div>
    `;
  }

  // Initialize simulation on a given bundle index
  function setupSimulation(bundleIndex = 0) {
    if (!currentGeneratedBundles || currentGeneratedBundles.length === 0) return;
    activeBundleIndex = Math.max(0, Math.min(bundleIndex, currentGeneratedBundles.length - 1));
    const activeBundle = currentGeneratedBundles[activeBundleIndex];

    // Render switcher tabs
    if (simArchSwitcher) {
      if (currentGeneratedBundles.length > 1) {
        let tabsHtml = '';
        currentGeneratedBundles.forEach((b, idx) => {
          const isActive = (idx === activeBundleIndex);
          tabsHtml += `<button type="button" class="sim-arch-tab ${isActive ? 'active' : ''}" data-idx="${idx}">${escapeHtml(b.badge)}</button>`;
        });
        simArchSwitcher.innerHTML = tabsHtml;
        const tabs = simArchSwitcher.querySelectorAll('.sim-arch-tab');
        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            const newIdx = parseInt(tab.getAttribute('data-idx'), 10);
            pauseSimulation();
            setupSimulation(newIdx);
          });
        });
      } else {
        simArchSwitcher.innerHTML = `<span class="sim-arch-tab active">${escapeHtml(activeBundle.badge)}</span>`;
      }
    }

    simSteps = buildSimulationSteps(activeBundle, currentTargetVar);
    simCurrentStep = 0;
    renderSimulationStep(0);
  }

  // Render a specific simulation step
  function renderSimulationStep(stepIndex) {
    if (!simSteps || simSteps.length === 0) return;
    simCurrentStep = Math.max(0, Math.min(stepIndex, simSteps.length - 1));
    const step = simSteps[simCurrentStep];

    if (simExprDisplay) simExprDisplay.textContent = currentExpression;
    if (simTargetDisplay) simTargetDisplay.textContent = currentTargetVar;
    if (simStepIndicator) simStepIndicator.textContent = `Step ${step.stepNum} of ${step.totalSteps}`;
    if (simProgressFill) {
      const pct = (step.stepNum / step.totalSteps) * 100;
      simProgressFill.style.width = `${pct}%`;
    }

    if (simHeroBadge) simHeroBadge.textContent = `Current Instruction: Step ${step.stepNum}`;
    if (simHeroFormatTag) simHeroFormatTag.textContent = step.formatTag;
    if (simHeroOpcode) simHeroOpcode.textContent = step.opcode;
    if (simHeroOperand) simHeroOperand.textContent = step.operand ? ` ${step.operand}` : '';
    if (simSemanticCode) simSemanticCode.textContent = step.semantic;

    if (simDataflowCanvas) simDataflowCanvas.innerHTML = step.dataflowHtml;
    if (simHardwareNote) simHardwareNote.textContent = step.hardwareNote;
    if (simHardwareBoard) simHardwareBoard.innerHTML = step.hardwareHtml;
    if (simExpText) simExpText.innerHTML = step.explanation;
    if (simVivaTip) simVivaTip.innerHTML = step.vivaTip;

    if (simPrevBtn) simPrevBtn.disabled = (simCurrentStep === 0);
    if (simNextBtn) simNextBtn.disabled = (simCurrentStep === simSteps.length - 1);

    if (simCompleteBanner) {
      if (step.isFinal) {
        simCompleteBanner.classList.remove('hidden');
        if (simCompleteTarget) simCompleteTarget.textContent = currentTargetVar;
        if (simCompleteMsg) {
          simCompleteMsg.innerHTML = `The expression <code>${escapeHtml(currentExpression)}</code> has been fully evaluated and committed to target destination <strong>${escapeHtml(currentTargetVar)}</strong> in ${step.totalSteps} instruction steps.`;
        }
      } else {
        simCompleteBanner.classList.add('hidden');
      }
    }
  }

  // Auto-play toggle
  function togglePlaySimulation() {
    if (simIsPlaying) {
      pauseSimulation();
    } else {
      if (simCurrentStep >= simSteps.length - 1) {
        simCurrentStep = 0;
        renderSimulationStep(0);
      }
      simIsPlaying = true;
      if (simPlayIcon) simPlayIcon.textContent = '⏸';
      if (simPlayText) simPlayText.textContent = 'Pause';
      if (simPlayBtn) simPlayBtn.classList.add('playing');

      simPlayTimer = setInterval(() => {
        if (simCurrentStep < simSteps.length - 1) {
          simCurrentStep++;
          renderSimulationStep(simCurrentStep);
        } else {
          pauseSimulation();
        }
      }, 1300);
    }
  }

  function pauseSimulation() {
    if (simPlayTimer) {
      clearInterval(simPlayTimer);
      simPlayTimer = null;
    }
    simIsPlaying = false;
    if (simPlayIcon) simPlayIcon.textContent = '▶';
    if (simPlayText) simPlayText.textContent = 'Auto Play';
    if (simPlayBtn) simPlayBtn.classList.remove('playing');
  }

  // Setup simulator event listeners
  if (startVisualizerBtn) {
    startVisualizerBtn.addEventListener('click', () => {
      if (visualExecutionContainer) {
        visualExecutionContainer.classList.remove('hidden');
        setupSimulation(0);
        visualExecutionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (simPrevBtn) {
    simPrevBtn.addEventListener('click', () => {
      pauseSimulation();
      if (simCurrentStep > 0) renderSimulationStep(simCurrentStep - 1);
    });
  }

  if (simNextBtn) {
    simNextBtn.addEventListener('click', () => {
      pauseSimulation();
      if (simCurrentStep < simSteps.length - 1) renderSimulationStep(simCurrentStep + 1);
    });
  }

  if (simResetBtn) {
    simResetBtn.addEventListener('click', () => {
      pauseSimulation();
      renderSimulationStep(0);
    });
  }

  if (simPlayBtn) {
    simPlayBtn.addEventListener('click', togglePlaySimulation);
  }

  if (generateInstructionsBtn) generateInstructionsBtn.addEventListener('click', generateInstructions);
  if (clearGeneratorBtn) clearGeneratorBtn.addEventListener('click', clearGenerator);
  if (clearExprBtn) clearExprBtn.addEventListener('click', () => {
    exprInput.value = '';
    exprInput.focus();
  });
  if (archSelect) archSelect.addEventListener('change', generateInstructions);

  // Expression chips
  exprChips.forEach(chip => {
    chip.addEventListener('click', () => {
      exprChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      exprInput.value = chip.getAttribute('data-expr');
      generateInstructions();
    });
  });

  // Initial generation
  generateInstructions();

  /* ==========================================================================
     5. GALLERY LIGHTBOX MODAL & FILTERING
     ========================================================================== */
  const galleryItems = [
    {
      src: 'assets/gallery/gallery_1.png',
      category: 'achievement',
      badge: 'Achievement',
      title: '3rd Position in Ideathon (2026)',
      meta: 'Ignite Youth Club & IKS, Chandigarh University • Feb 2026',
      desc: 'Awarded Certificate of Achievement for securing 3rd position in Integrated Green Mobility Ideathon focusing on sustainable vehicles inspired by Indian Knowledge Systems.'
    },
    {
      src: 'assets/gallery/gallery_2.png',
      category: 'participation',
      badge: 'Participation',
      title: 'Build Summit — Chandigarh University & byteXL',
      meta: 'Chandigarh University & byteXL • Certificate of Participation',
      desc: 'Active team project participation and felicitation ceremony during the collaborative Build Summit initiative with byteXL.'
    },
    {
      src: 'assets/gallery/gallery_3.png',
      category: 'participation',
      badge: 'Membership',
      title: 'IEEE Student Membership Card',
      meta: 'IEEE Delhi Section • Member #102661886 • Valid through Dec 2027',
      desc: 'Official IEEE Student Membership credential for active participation in global technical conferences, IEEE Computer Society, and academic initiatives.'
    },
    {
      src: 'assets/gallery/gallery_4.png',
      category: 'certification',
      badge: 'Certification',
      title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
      meta: 'Microsoft • Issued April 28, 2026 • Certiport Verified',
      desc: 'Official certification validating core machine learning, computer vision, natural language processing, and conversational AI workloads on Microsoft Azure cloud.'
    },
    {
      src: 'assets/gallery/gallery_5.png',
      category: 'academic',
      badge: 'Academic Record',
      title: 'Chandigarh University CUIMS Transcript (CGPA 9.67)',
      meta: 'BE CSE (Artificial Intelligence) • UID: 25BAI10014',
      desc: 'Official CUIMS semester performance verifying cumulative CGPA of 9.67 (Semester 1 SGPA: 9.65 | Semester 2 SGPA: 9.70) with A+ grades in core technical subjects.'
    },
    {
      src: 'assets/gallery/gallery_6.png',
      category: 'achievement',
      badge: 'Achievement',
      title: 'Ideathon Team Felicitation Ceremony',
      meta: 'Campus Recognition • Ignite Youth Club & IKS',
      desc: 'Commemorative photograph of team members displaying Certificates of Achievement for the 3rd rank in Green Mobility Ideathon at Chandigarh University.'
    },
    {
      src: 'assets/gallery/gallery_7.png',
      category: 'participation',
      badge: 'Participation',
      title: 'Active Participant — HERizon 2026',
      meta: 'UIE Chandigarh University & IEEE India Council • March 2026',
      desc: 'Awarded Certificate of Participation for actively participating in HERizon 2026 (Women in Tech Initiative) organized by University Institute of Engineering & IEEE India Council.'
    },
    {
      src: 'assets/gallery/gallery_8.png',
      category: 'certification',
      badge: 'Certification',
      title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
      meta: 'Microsoft • Issued November 19, 2025 • Certiport Verified',
      desc: 'Demonstrates foundational knowledge of cloud services, security, privacy, compliance, and core Azure architectural components.'
    }
  ];

  let currentGalleryIndex = 0;
  const galleryCards = document.querySelectorAll('.gallery-card');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryModal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalDesc = document.getElementById('modalDesc');
  const modalCategory = document.getElementById('modalCategory');
  const modalCounter = document.getElementById('modalCounter');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalPrevBtn = document.getElementById('modalPrevBtn');
  const modalNextBtn = document.getElementById('modalNextBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  // Filter items
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Lightbox Modal
  function openGalleryModal(index) {
    if (index < 0 || index >= galleryItems.length) return;
    currentGalleryIndex = index;
    const item = galleryItems[index];

    modalImg.src = item.src;
    modalImg.alt = item.title;
    modalTitle.textContent = item.title;
    modalMeta.textContent = item.meta;
    modalDesc.textContent = item.desc;
    modalCategory.textContent = item.badge;
    modalCounter.textContent = `${index + 1} / ${galleryItems.length}`;

    galleryModal.classList.add('active');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryModal() {
    galleryModal.classList.remove('active');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    openGalleryModal(currentGalleryIndex);
  }

  function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    openGalleryModal(currentGalleryIndex);
  }

  // Attach card click handlers
  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      openGalleryModal(idx);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeGalleryModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeGalleryModal);
  if (modalNextBtn) modalNextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextImage(); });
  if (modalPrevBtn) modalPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevImage(); });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeGalleryModal();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  /* ==========================================================================
     6. ASSIGNMENT-1 PDF VIEWER HANDLING
     ========================================================================== */
  const assignmentIframe = document.getElementById('assignmentIframe');
  const pdfFallbackMsg = document.getElementById('pdfFallbackMsg');

  // Verify PDF presence
  if (assignmentIframe) {
    assignmentIframe.addEventListener('error', () => {
      if (pdfFallbackMsg) pdfFallbackMsg.classList.remove('hidden');
    });
  }

  // Initialize display: activate Home section on initial load
  showSection('home');

  console.log('Hiteshi Kadian COA Portfolio initialized successfully.');
});
