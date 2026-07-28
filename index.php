<?php
$msg = "";
$msg_type = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $company = isset($_POST['company']) ? htmlspecialchars(trim($_POST['company'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $solution = isset($_POST['solution']) ? htmlspecialchars(trim($_POST['solution'])) : '';
    $brief = isset($_POST['brief']) ? htmlspecialchars(trim($_POST['brief'])) : '';

    if ($name && $company && $email && $phone && $solution && $brief) {
        // Construct log directory and file path
        $log_dir = __DIR__ . '/assets/inquiries';
        if (!file_exists($log_dir)) {
            @mkdir($log_dir, 0777, true);
        }
        
        $log_file = $log_dir . '/inquiries.txt';
        $log_data = "[" . date("Y-m-d H:i:s") . "] Name: $name | Company: $company | Email: $email | Phone: $phone | Solution: $solution | Brief: $brief\n";
        @file_put_contents($log_file, $log_data, FILE_APPEND);

        // In production, you would trigger:
        // mail("official@adiansolution.com", "New Quotation Request - " . $company, $brief, "From: " . $email);

        $msg = "Thank you, $name! Your inquiry has been received. Our engineers will get in touch with you shortly at $email.";
        $msg_type = "success";
    } else {
        $msg = "Inquiry failed. Please ensure all fields are filled out correctly.";
        $msg_type = "error";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ADIAN Solution & Services | B2B Industrial Automation & Liquid Dosing Systems</title>
    <!-- SEO Meta Tags -->
    <meta name="description" content="ADIAN Solution & Services delivers premium industrial automation solutions, including PLC, SCADA, control panels, APFC panels, and specialized liquid dosing systems.">
    <meta name="keywords" content="Industrial Automation, PLC, SCADA, Control Panels, Liquid Dosing Systems, PCC, MCC, APFC Panels, ADIAN Solution">
    <meta name="author" content="ADIAN Solution & Services">
    
    <!-- Google Fonts: Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- FontAwesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- AOS (Animate on Scroll) CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <!-- --- HEADER / STICKY NAVBAR --- -->
    <header class="site-header" id="site-header">
        <div class="container nav-container">
            <a href="#" class="brand-logo">
                <img src="assets/images/logo.png" alt="ADIAN Solution & Services Logo" class="logo-img">
            </a>
            
            <nav class="nav-menu">
                <button class="mobile-nav-close" aria-label="Close Navigation Menu">
                    <i class="fas fa-times"></i>
                </button>
                <ul>
                    <li><a href="#" class="active">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#solutions">Solutions</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#industries">Industries</a></li>
                    <li><a href="#why-choose-us">Why Choose Us</a></li>
                    <li><a href="#testimonials">Testimonials</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            
            <a href="#contact" class="btn btn-accent">Get a Quote</a>
            
            <button class="mobile-nav-toggle" aria-label="Toggle Navigation Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- --- HERO SECTION --- -->
    <section class="hero-section">
        <div class="hero-video-overlay"></div>
        <div class="container">
            <div class="hero-left" data-aos="fade-right">
                <span class="hero-tag">Industrial Automation Solutions</span>
                <h1 class="hero-title">
                    <span>SMART AUTOMATION</span>
                    <span>RELIABLE PERFORMANCE</span>
                    <span class="accent-text">BETTER TOMORROW</span>
                </h1>
                <p class="hero-desc">
                    Delivering advanced automation solutions that drive efficiency, improve reliability and build a smarter tomorrow.
                </p>
                <div class="hero-actions">
                    <a href="#solutions" class="btn btn-primary">EXPLORE SOLUTIONS <i class="fas fa-arrow-right"></i></a>
                    <a href="#contact" class="btn btn-secondary">GET IN TOUCH</a>
                </div>
            </div>
            
            <div class="hero-right" data-aos="fade-left">
                <div class="diamond-grid">
                    <!-- Central Subtle Ambient Glow -->
                    <div class="center-glow"></div>
                    
                    <!-- Automated PLC Control Panel Machine (Top) -->
                    <div class="diamond-card dc-top">
                        <div class="diamond-content">
                            <img src="assets/images/plc_panel.png" alt="Automated PLC Control Panel Machine">
                        </div>
                        <span class="diamond-label">PLC Panel Machine</span>
                    </div>
                    <!-- SCADA Automated Monitor Station (Left) -->
                    <div class="diamond-card dc-left">
                        <div class="diamond-content">
                            <img src="assets/images/scada_monitor.png" alt="SCADA Automated Process Control Station">
                        </div>
                        <span class="diamond-label">SCADA Console</span>
                    </div>
                    <!-- Automated Liquid Dosing Machine Unit (Right) -->
                    <div class="diamond-card dc-right">
                        <div class="diamond-content">
                            <img src="assets/images/liquid_dosing.png" alt="Automated Liquid Dosing Machine Unit">
                        </div>
                        <span class="diamond-label">Liquid Dosing Machine</span>
                    </div>
                    <!-- Automated Stainless Plant Reactor (Bottom) -->
                    <div class="diamond-card dc-bottom">
                        <div class="diamond-content">
                            <img src="assets/images/stainless_plant.png" alt="Automated Stainless Processing Reactor Plant">
                        </div>
                        <span class="diamond-label">Stainless Plant</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- --- STATISTICS STRIP --- -->
    <section class="stats-strip">
        <div class="container">
            <div class="stats-grid">
                <!-- Card 1 -->
                <div class="stat-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="stat-icon"><i class="fa-solid fa-gears"></i></div>
                    <div class="stat-info">
                        <span class="stat-number" data-target="250">0</span>
                        <span class="stat-label">Projects Completed</span>
                    </div>
                </div>
                <!-- Card 2 -->
                <div class="stat-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="stat-icon"><i class="fa-solid fa-handshake"></i></div>
                    <div class="stat-info">
                        <span class="stat-number" data-target="120">0</span>
                        <span class="stat-label">Happy Clients</span>
                    </div>
                </div>
                <!-- Card 3 -->
                <div class="stat-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="stat-icon"><i class="fa-solid fa-award"></i></div>
                    <div class="stat-info">
                        <span class="stat-number" data-target="15">0</span>
                        <span class="stat-label">Years Experience</span>
                    </div>
                </div>
                <!-- Card 4 -->
                <div class="stat-card" data-aos="fade-up" data-aos-delay="400">
                    <div class="stat-icon"><i class="fa-solid fa-user-gear"></i></div>
                    <div class="stat-info">
                        <span class="stat-number" data-target="50">0</span>
                        <span class="stat-label">Expert Engineers</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- --- OUR SOLUTIONS SECTION --- -->
    <section class="section" id="solutions">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-tag">High-End Engineering</span>
                <h2 class="section-title">Innovative <span>Solutions</span> For Modern Industries</h2>
            </div>
            
            <div class="solutions-grid">
                <!-- PLC & SCADA -->
                <div class="solution-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="solution-icon-container">
                        <i class="fa-solid fa-microchip"></i>
                    </div>
                    <h3>PLC & SCADA</h3>
                    <p>Custom programmable logic controller (PLC) programming and Supervisory Control and Data Acquisition (SCADA) dashboards designed for high productivity and real-time insight.</p>
                </div>
                <!-- Liquid Dosing Systems -->
                <div class="solution-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="solution-icon-container">
                        <i class="fa-solid fa-tint"></i>
                    </div>
                    <h3>Liquid Dosing Systems</h3>
                    <p>Highly precise liquid dosing applicators engineered for chemical, water, pharma, and agricultural feed applications to ensure exact volumetric accuracy.</p>
                </div>
                <!-- PCC Panels -->
                <div class="solution-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="solution-icon-container">
                        <i class="fa-solid fa-charging-station"></i>
                    </div>
                    <h3>PCC Panels</h3>
                    <p>Robust Power Control Centre (PCC) panels designed for main power distribution systems, engineered to handle heavy electrical loads with maximum safety.</p>
                </div>
                <!-- MCC Panels -->
                <div class="solution-card" data-aos="fade-up" data-aos-delay="400">
                    <div class="solution-icon-container">
                        <i class="fa-solid fa-sliders"></i>
                    </div>
                    <h3>MCC Panels</h3>
                    <p>Motor Control Centre (MCC) panels featuring robust starters, contactors, and protection devices to govern electric motor drive applications smoothly.</p>
                </div>
                <!-- APFC Panels -->
                <div class="solution-card" data-aos="fade-up" data-aos-delay="500">
                    <div class="solution-icon-container">
                        <i class="fa-solid fa-bolt"></i>
                    </div>
                    <h3>APFC Panels</h3>
                    <p>Automatic Power Factor Correction (APFC) panels to dynamically regulate power factor, optimize electricity bill efficiency, and reduce line penalties.</p>
                </div>
                <!-- Industrial Automation -->
                <div class="solution-card" data-aos="fade-up" data-aos-delay="600">
                    <div class="solution-icon-container">
                        <i class="fa-solid fa-industry"></i>
                    </div>
                    <h3>Industrial Automation</h3>
                    <p>End-to-end plant instrumentation and automation consultancy, panel building, loop check-outs, and custom control room architecture setups.</p>
                </div>
            </div>

            <!-- Section CTA Callout Banner -->
            <div class="section-cta-banner" data-aos="fade-up">
                <div class="cta-banner-text">
                    <h3>Need a Custom Automation & PLC Architecture?</h3>
                    <p>Our senior engineers build turnkey control panels, SCADA software, and liquid dosing systems custom tailored to your exact manufacturing process.</p>
                </div>
                <div class="cta-banner-actions">
                    <a href="#contact" class="btn btn-accent"><i class="fas fa-user-gear"></i> Talk to an Engineer</a>
                    <a href="tel:+918100122721" class="btn btn-outline-white"><i class="fas fa-phone"></i> Call Support</a>
                </div>
            </div>
        </div>
    </section>

    <!-- --- INDUSTRIES WE SERVE --- -->
    <section class="section bg-light" id="industries">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-tag">Diverse Verticals</span>
                <h2 class="section-title">Industries <span>We Serve</span></h2>
            </div>
            
            <div class="industries-grid">
                <!-- Food Industry -->
                <div class="industry-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="industry-icon-box">
                        <i class="fa-solid fa-utensils"></i>
                    </div>
                    <h3>Food Industry</h3>
                    <p>Providing hygienic process flow controls, recipe batching automation, and precise chemical dosing systems for food production plants.</p>
                </div>
                <!-- Pharmaceutical -->
                <div class="industry-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="industry-icon-box">
                        <i class="fa-solid fa-pills"></i>
                    </div>
                    <h3>Pharmaceutical</h3>
                    <p>Designing FDA-compliant PLC logic, detailed digital batch records, and sterile liquid dosing machines for high quality controls.</p>
                </div>
                <!-- Chemical -->
                <div class="industry-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="industry-icon-box">
                        <i class="fa-solid fa-flask"></i>
                    </div>
                    <h3>Chemical</h3>
                    <p>Delivering high-safety control panels, ex-proof pressure loops, and automated chemical reactor controls for processing units.</p>
                </div>
                <!-- Water Treatment -->
                <div class="industry-card" data-aos="fade-up" data-aos-delay="400">
                    <div class="industry-icon-box">
                        <i class="fa-solid fa-hand-holding-droplet"></i>
                    </div>
                    <h3>Water Treatment</h3>
                    <p>Optimizing filtration cycles, reverse osmosis automation, and precise pH adjusters/chlorinators via specialized dosing pumps.</p>
                </div>
                <!-- Packaging -->
                <div class="industry-card" data-aos="fade-up" data-aos-delay="500">
                    <div class="industry-icon-box">
                        <i class="fa-solid fa-box-open"></i>
                    </div>
                    <h3>Packaging</h3>
                    <p>Deploying high-speed motion controllers, packaging line sorting algorithms, and VFD settings for bottling and boxing automation.</p>
                </div>
                <!-- Textile -->
                <div class="industry-card" data-aos="fade-up" data-aos-delay="600">
                    <div class="industry-icon-box">
                        <i class="fa-solid fa-shirt"></i>
                    </div>
                    <h3>Textile</h3>
                    <p>Automating fabric processing lines, temperature settings control on drying units, and optimizing power usage via APFC panels.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- --- PRODUCT SHOWCASE SECTION --- -->
    <section class="section" id="products">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-tag">Featured Products</span>
                <h2 class="section-title">Explore Our <span>B2B Industrial Catalog</span></h2>
            </div>
            
            <div class="product-grid-container">
                <div class="product-grid">
                    <!-- Product 1: PLC Panel -->
                    <div class="product-card" data-aos="fade-up" data-aos-delay="100">
                        <div class="product-img-wrapper">
                            <img src="assets/images/plc_panel.png" alt="PLC Panel">
                        </div>
                        <h3>PLC Panel</h3>
                        <div class="product-specs">
                            <span>Modular Controller: Siemens S7/Rockwell</span>
                            <span>Steel Enclosure: IP54/IP65 Dustproof</span>
                            <span>Fully Configured & Programmed</span>
                        </div>
                        <a href="#contact" class="btn btn-outline-blue">Inquire Specifications</a>
                    </div>
                    
                    <!-- Product 2: Liquid Dosing System -->
                    <div class="product-card" data-aos="fade-up" data-aos-delay="200">
                        <div class="product-img-wrapper">
                            <img src="assets/images/liquid_dosing.png" alt="Liquid Dosing System">
                        </div>
                        <h3>Liquid Dosing System</h3>
                        <div class="product-specs">
                            <span>Flow Range: 0.1 L/h - 500 L/h</span>
                            <span>Structure: SS304/SS316 Stainless Steel</span>
                            <span>Integrated Flow Sensor Control</span>
                        </div>
                        <a href="#contact" class="btn btn-outline-blue">Inquire Specifications</a>
                    </div>
                    
                    <!-- Product 3: APFC Panel -->
                    <div class="product-card" data-aos="fade-up" data-aos-delay="300">
                        <div class="product-img-wrapper">
                            <img src="assets/images/scada_monitor.png" alt="APFC Panel & Monitoring Console">
                        </div>
                        <h3>APFC Panel</h3>
                        <div class="product-specs">
                            <span>Target Cos Phi: 0.99 constant regulation</span>
                            <span>Capacitor Steps: 4 to 12 multi-stage</span>
                            <span>Built-in Digital Power Meter Controller</span>
                        </div>
                        <a href="#contact" class="btn btn-outline-blue">Inquire Specifications</a>
                    </div>
                </div>
                
                <div class="product-row-2">
                    <!-- Product 4: MCC Panel -->
                    <div class="product-card" data-aos="fade-up" data-aos-delay="400">
                        <div class="product-img-wrapper">
                            <img src="assets/images/stainless_plant.png" alt="MCC Motor Control Plant Assembly">
                        </div>
                        <h3>MCC Panel</h3>
                        <div class="product-specs">
                            <span>Starter: DOL & Star-Delta automated</span>
                            <span>Communication: Modbus/Profibus support</span>
                            <span>Indication: Led status indicators per motor</span>
                        </div>
                        <a href="#contact" class="btn btn-outline-blue">Inquire Specifications</a>
                    </div>
                    
                    <!-- Product 5: Control Panel -->
                    <div class="product-card" data-aos="fade-up" data-aos-delay="500">
                        <div class="product-img-wrapper">
                            <img src="assets/images/industrial_piping.png" alt="Industrial Control Panel & Manifold">
                        </div>
                        <h3>Control Panel</h3>
                        <div class="product-specs">
                            <span>Application: Plant Machine Command</span>
                            <span>Wiring: Ferrule-marked premium neat routing</span>
                            <span>Approvals: Standard CE / Industrial safety</span>
                        </div>
                        <a href="#contact" class="btn btn-outline-blue">Inquire Specifications</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- --- WHY CHOOSE US --- -->
    <section class="section why-section bg-light" id="why-choose-us">
        <div class="container">
            <div class="why-left" data-aos="fade-right">
                <div class="engineer-status-pill">
                    <span class="live-pulse-dot"></span> Senior Engineer On-Duty
                </div>
                <img src="assets/images/engineer_working.png" alt="Industrial Engineer working on panel board">
                <div class="why-experience-badge">
                    <span class="why-badge-num">15+</span>
                    <span class="why-badge-text">Years Of<br>excellence</span>
                </div>
            </div>
            
            <div class="why-right" data-aos="fade-left">
                <div class="why-heading">
                    <span class="section-tag">Core Strengths</span>
                    <h2 class="section-title">Engineered For <span>Reliable Performance</span></h2>
                </div>
                <p class="why-desc">
                    At ADIAN Solution & Services, we merge deep industrial expertise with modern automation technologies. We understand the high costs of assembly line downtime, which is why we build systems focused on longevity, stability, and round-the-clock reliability.
                </p>
                
                <div class="why-features">
                    <!-- Feature 1 -->
                    <div class="why-feature-item">
                        <div class="why-feature-icon"><i class="fas fa-check"></i></div>
                        <div>
                            <h3 class="why-feature-title">10+ Years Experience</h3>
                            <p class="why-feature-desc">Over a decade of successful plant integrations and field commissioning experience.</p>
                        </div>
                    </div>
                    <!-- Feature 2 -->
                    <div class="why-feature-item">
                        <div class="why-feature-icon"><i class="fas fa-check"></i></div>
                        <div>
                            <h3 class="why-feature-title">Certified Engineers</h3>
                            <p class="why-feature-desc">Highly skilled hardware planners and PLC programmers trained on global platforms.</p>
                        </div>
                    </div>
                    <!-- Feature 3 -->
                    <div class="why-feature-item">
                        <div class="why-feature-icon"><i class="fas fa-check"></i></div>
                        <div>
                            <h3 class="why-feature-title">24x7 Support</h3>
                            <p class="why-feature-desc">Active helpline and fast engineering dispatch to avoid production bottlenecks.</p>
                        </div>
                    </div>
                    <!-- Feature 4 -->
                    <div class="why-feature-item">
                        <div class="why-feature-icon"><i class="fas fa-check"></i></div>
                        <div>
                            <h3 class="why-feature-title">Customized Automation</h3>
                            <p class="why-feature-desc">Modular panel designs and tailor-made logic architectures matching your production flow.</p>
                        </div>
                    </div>
                    <!-- Feature 5 -->
                    <div class="why-feature-item">
                        <div class="why-feature-icon"><i class="fas fa-check"></i></div>
                        <div>
                            <h3 class="why-feature-title">On-time Delivery</h3>
                            <p class="why-feature-desc">Strict scheduling workflows ensuring production panels are delivered and deployed on time.</p>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 35px; display: flex; gap: 15px; flex-wrap: wrap;">
                    <a href="#contact" class="btn btn-primary"><i class="fas fa-sliders"></i> Schedule Plant Audit</a>
                    <a href="tel:+918100122721" class="btn btn-outline-blue"><i class="fas fa-headset"></i> 24x7 Helpline</a>
                </div>
            </div>
        </div>
    </section>

    <!-- --- WORK PROCESS SECTION --- -->
    <section class="section" id="process">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-tag">Systematic Execution</span>
                <h2 class="section-title">Our Structured <span>Work Process</span></h2>
            </div>
            
            <div class="process-timeline">
                <div class="timeline-grid">
                    <!-- Step 1 -->
                    <div class="timeline-step" data-aos="fade-up" data-aos-delay="100">
                        <div class="step-number">01</div>
                        <h3 class="step-title">Consultation</h3>
                        <p class="step-desc">Analyzing plant workflow requirements and process parameters.</p>
                    </div>
                    <!-- Step 2 -->
                    <div class="timeline-step" data-aos="fade-up" data-aos-delay="200">
                        <div class="step-number">02</div>
                        <h3 class="step-title">Design</h3>
                        <p class="step-desc">Creating system schematic diagrams, layouts, and PLC program models.</p>
                    </div>
                    <!-- Step 3 -->
                    <div class="timeline-step" data-aos="fade-up" data-aos-delay="300">
                        <div class="step-number">03</div>
                        <h3 class="step-title">Manufacturing</h3>
                        <p class="step-desc">Panel sheet assembly, component integration, and wiring logic.</p>
                    </div>
                    <!-- Step 4 -->
                    <div class="timeline-step" data-aos="fade-up" data-aos-delay="400">
                        <div class="step-number">04</div>
                        <h3 class="step-title">Installation</h3>
                        <p class="step-desc">Positioning hardware, field terminal wiring, and power testing.</p>
                    </div>
                    <!-- Step 5 -->
                    <div class="timeline-step" data-aos="fade-up" data-aos-delay="500">
                        <div class="step-number">05</div>
                        <h3 class="step-title">Commissioning</h3>
                        <p class="step-desc">Signal loop checking, system hot testing, and handing over.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- --- CLIENT TESTIMONIALS SECTION --- -->
    <section class="section testimonials-section" id="testimonials">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-tag">Client Reviews</span>
                <h2 class="section-title">What Our <span>Partners Say</span></h2>
            </div>
            
            <div class="testimonials-grid">
                <!-- Testimonial 1 -->
                <div class="testimonial-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="testimonial-rating">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-review">
                        "The liquid dosing applicator installed by ADIAN Solution has improved our additive precision tenfold. Their PLC programs are very robust and easy to operate. Their team provides excellent support."
                    </p>
                    <div class="testimonial-client">
                        <div class="testimonial-avatar">A</div>
                        <div class="testimonial-client-info">
                            <h4>Amit Sen</h4>
                            <p>Operations Lead, Apex Feed Industries</p>
                        </div>
                    </div>
                </div>
                <!-- Testimonial 2 -->
                <div class="testimonial-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="testimonial-rating">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-review">
                        "We hired them to design and deploy MCC and APFC panels across our packaging line. The power optimization has already reduced our utility penalties. Absolute professionals in industrial electricity."
                    </p>
                    <div class="testimonial-client">
                        <div class="testimonial-avatar">S</div>
                        <div class="testimonial-client-info">
                            <h4>S. K. Sharma</h4>
                            <p>Plant Director, Himalaya Pharma Logistics</p>
                        </div>
                    </div>
                </div>
                <!-- Testimonial 3 -->
                <div class="testimonial-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="testimonial-rating">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-review">
                        "Their commissioning work on our water treatment filtration setup was smooth. The custom Siemens PLC console panel operates perfectly. Recommended for complex B2B plant solutions."
                    </p>
                    <div class="testimonial-client">
                        <div class="testimonial-avatar">R</div>
                        <div class="testimonial-client-info">
                            <h4>Rajesh Gupta</h4>
                            <p>General Manager, AquaPure Solutions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- --- CONTACT CTA SECTION --- -->
    <section class="contact-cta">
        <div class="contact-cta-content" data-aos="zoom-in">
            <h2>Ready to Automate Your Plant?</h2>
            <p>Connect with our expert automation planners today. We offer engineering consultations and complimentary structural panel quotations for all manufacturing applications.</p>
            <a href="#contact" class="btn btn-accent btn-lg">Request Free Consultation <i class="fas fa-calendar-alt"></i></a>
        </div>
    </section>

    <!-- --- CONTACT SECTION & FORM --- -->
    <section class="section" id="contact">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <span class="section-tag">Get in Touch</span>
                <h2 class="section-title">Request a <span>Quotations & Consultation</span></h2>
            </div>
            
            <div class="contact-grid">
                <!-- Contact info details (copied legal corporate details from banner) -->
                <div class="why-right" data-aos="fade-right">
                    <h3 style="font-size: 22px; color: var(--secondary-color); margin-bottom: 20px; font-weight: 700;">Corporate Office & Details</h3>
                    <p style="font-size: 14px; color: var(--text-light); margin-bottom: 30px; line-height: 1.7;">Please reach out to us using the contact details below, or send us a request message directly. Our engineering team responds within 24 business hours.</p>
                    
                    <div class="contact-info-list">
                        <!-- Phone -->
                        <div class="contact-item-box">
                            <div class="contact-item-icon">
                                <i class="fas fa-phone-alt"></i>
                            </div>
                            <div class="contact-item-details">
                                <span class="contact-item-label">Phone & Mobile Support</span>
                                <span class="contact-item-value">+91 8100122721</span>
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="contact-item-box">
                            <div class="contact-item-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="contact-item-details">
                                <span class="contact-item-label">Official E-mail</span>
                                <span class="contact-item-value">official@adiansolution.com</span>
                            </div>
                        </div>

                        <!-- Registered Office -->
                        <div class="contact-item-box">
                            <div class="contact-item-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-item-details">
                                <span class="contact-item-label">Registered Home Office</span>
                                <span class="contact-item-value">Khakurda, Bara Mahanpur, Paschim Medinipur - 721 445</span>
                            </div>
                        </div>

                        <!-- Manufacturing Plant -->
                        <div class="contact-item-box">
                            <div class="contact-item-icon">
                                <i class="fas fa-industry"></i>
                            </div>
                            <div class="contact-item-details">
                                <span class="contact-item-label">Manufacturing Plant Address</span>
                                <span class="contact-item-value">Sankrail Industrial Rd, Sankrail Industrial Park, Poly Park, Dhulagori, Howrah, Jala Dhulagiri, West Bengal 711313</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="legal-info-badges">
                        <div class="legal-badge gst-badge">
                            <span class="legal-badge-label">GST Registration</span>
                            <span class="legal-badge-val">19CGBPM1738C1ZM</span>
                        </div>
                        <div class="legal-badge udyam-badge">
                            <span class="legal-badge-label">UDYAM REGISTRATION</span>
                            <span class="legal-badge-val">UDYAM-WB-16-0096011</span>
                        </div>
                    </div>
                </div>
                
                <!-- Contact Form Card -->
                <div class="contact-form-card" data-aos="fade-left">
                    
                    <!-- PHP Message Display -->
                    <?php if ($msg != ""): ?>
                        <div style="background-color: <?php echo $msg_type == 'success' ? '#DEF7EC' : '#FDE8E8'; ?>; color: <?php echo $msg_type == 'success' ? '#03543F' : '#9B1C1C'; ?>; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; font-weight: 500; border-left: 4px solid <?php echo $msg_type == 'success' ? '#0E9F6E' : '#E02424'; ?>;">
                            <?php echo $msg; ?>
                        </div>
                    <?php endif; ?>

                    <form action="index.php#contact" method="POST" id="quote-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Full Name *</label>
                                <input type="text" name="name" required placeholder="e.g. Rajesh Kumar" class="form-control">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Company / Plant Name *</label>
                                <input type="text" name="company" required placeholder="e.g. Industrial Ltd" class="form-control">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Email Address *</label>
                                <input type="email" name="email" required placeholder="name@company.com" class="form-control">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Phone / Mobile *</label>
                                <input type="tel" name="phone" required placeholder="+91 98765 43210" class="form-control">
                            </div>
                        </div>
                        
                        <div class="form-group mb-20">
                            <label class="form-label">Requested Solution *</label>
                            <select name="solution" class="form-control form-select">
                                <option>PLC & SCADA Automation</option>
                                <option>Liquid Dosing Systems</option>
                                <option>PCC & MCC Panels</option>
                                <option>APFC Panels</option>
                                <option>General Panel building / Other</option>
                            </select>
                        </div>
                        
                        <div class="form-group mb-25">
                            <label class="form-label">Detailed Project Brief *</label>
                            <textarea name="brief" rows="4" required placeholder="Describe your panel specs or dosing requirements..." class="form-control form-textarea"></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-submit">Submit Inquiry & Request Quote <i class="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- --- FOOTER --- -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <!-- Col 1: Logo & details -->
                <div class="footer-col">
                    <a href="#" class="footer-logo">
                        <img src="assets/images/logo.png" alt="ADIAN Solution & Services Logo" class="footer-logo-img">
                    </a>
                    <p class="footer-logo-desc">
                        State-of-the-art B2B Industrial Automation company providing premium PLC, SCADA, control panels, and liquid dosing systems. Ensuring safe, efficient, and smart automation lines.
                    </p>
                    <div class="footer-social-icons">
                        <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                
                <!-- Col 2: Solutions -->
                <div class="footer-col">
                    <h3>Solutions</h3>
                    <ul class="footer-links-list">
                        <li><a href="#solutions">PLC & SCADA</a></li>
                        <li><a href="#solutions">Liquid Dosing Systems</a></li>
                        <li><a href="#solutions">PCC panel boards</a></li>
                        <li><a href="#solutions">MCC panel boards</a></li>
                        <li><a href="#solutions">APFC panel boards</a></li>
                        <li><a href="#solutions">Industrial Electrification</a></li>
                    </ul>
                </div>
                
                <!-- Col 3: Quick Links -->
                <div class="footer-col">
                    <h3>Company</h3>
                    <ul class="footer-links-list">
                        <li><a href="#">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#products">Product Catalog</a></li>
                        <li><a href="#industries">Industries We Serve</a></li>
                        <li><a href="#why-choose-us">Why Choose Us</a></li>
                        <li><a href="#contact">Contact Support</a></li>
                    </ul>
                </div>
                
                <!-- Col 4: Contact details -->
                <div class="footer-col">
                    <h3>Contact Info</h3>
                    <div class="footer-contact-info">
                        <div class="footer-contact-item">
                            <div class="footer-contact-icon"><i class="fas fa-phone-alt"></i></div>
                            <div class="footer-contact-text">
                                <strong>Phone & Mobile</strong>
                                <span>+91 8100122721</span>
                            </div>
                        </div>
                        <div class="footer-contact-item">
                            <div class="footer-contact-icon"><i class="fas fa-envelope"></i></div>
                            <div class="footer-contact-text">
                                <strong>E-mail</strong>
                                <span>official@adiansolution.com</span>
                            </div>
                        </div>
                        <div class="footer-contact-item">
                            <div class="footer-contact-icon"><i class="fas fa-map-marker-alt"></i></div>
                            <div class="footer-contact-text">
                                <strong>Manufacturing Plant</strong>
                                <span>Howrah, West Bengal, India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <p>&copy; 2026 ADIAN Solution & Services. All Rights Reserved. GST: 19CGBPM1738C1ZM.</p>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- --- JAVASCRIPT LIBRARIES --- -->
    <!-- AOS (Animate on Scroll) JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script>
        // Initialize AOS animations
        document.addEventListener("DOMContentLoaded", () => {
            AOS.init({
                duration: 1000,
                once: true,
                easing: 'ease-out-cubic'
            });
        });
    </script>
    
    <!-- Left-Side Middle-Aligned Floating Action Dock -->
    <div class="left-floating-dock" id="leftDock">
        <a href="tel:+918100122721" class="left-dock-btn dock-call" title="Call Us Direct">
            <i class="fas fa-phone-alt"></i>
            <span>Call Direct</span>
        </a>
        <a href="https://wa.me/918100122721?text=Hello%20ADIAN%20Solution,%20I%20am%20interested%20in%20your%20automation%20services." target="_blank" class="left-dock-btn dock-whatsapp" title="Chat on WhatsApp">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp Chat</span>
        </a>
        <a href="#contact" class="left-dock-btn dock-quote" title="Get Instant Quote">
            <i class="fas fa-paper-plane"></i>
            <span>Instant Quote</span>
        </a>
    </div>

    <!-- Main JS -->
    <script src="assets/js/main.js"></script>
</body>
</html>
