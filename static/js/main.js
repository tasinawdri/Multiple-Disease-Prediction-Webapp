// Heart disease fields
const heartFields = [
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'sex', label: 'Sex (1 = male, 0 = female)', type: 'number', min: 0, max: 1 },
    { name: 'cp', label: 'Chest Pain Type (0-3)', type: 'number', min: 0, max: 3 },
    { name: 'trestbps', label: 'Resting Blood Pressure', type: 'number' },
    { name: 'chol', label: 'Serum Cholesterol', type: 'number' },
    { name: 'fbs', label: 'Fasting Blood Sugar > 120 mg/dl (1 = true, 0 = false)', type: 'number', min: 0, max: 1 },
    { name: 'restecg', label: 'Resting ECG Results (0-2)', type: 'number', min: 0, max: 2 },
    { name: 'thalach', label: 'Maximum Heart Rate', type: 'number' },
    { name: 'exang', label: 'Exercise-Induced Angina (1 = yes, 0 = no)', type: 'number', min: 0, max: 1 },
    { name: 'oldpeak', label: 'ST Depression', type: 'number', step: 0.1 },
    { name: 'slope', label: 'Slope of Peak Exercise ST Segment (0-2)', type: 'number', min: 0, max: 2 },
    { name: 'ca', label: 'Number of Major Vessels (0-3)', type: 'number', min: 0, max: 3 },
    { name: 'thal', label: 'Thalassemia (0-2)', type: 'number', min: 0, max: 2 }
];

// Parkinson's disease fields
const parkinsonFields = [
    { name: 'mdvp_fo', label: 'MDVP:Fo(Hz)', type: 'number', step: 0.01 },
    { name: 'mdvp_fhi', label: 'MDVP:Fhi(Hz)', type: 'number', step: 0.01 },
    { name: 'mdvp_flo', label: 'MDVP:Flo(Hz)', type: 'number', step: 0.01 },
    { name: 'mdvp_jitter', label: 'MDVP:Jitter(%)', type: 'number', step: 0.0001 },
    { name: 'mdvp_jitter_abs', label: 'MDVP:Jitter(Abs)', type: 'number', step: 0.0001 },
    { name: 'mdvp_rap', label: 'MDVP:RAP', type: 'number', step: 0.0001 },
    { name: 'mdvp_ppq', label: 'MDVP:PPQ', type: 'number', step: 0.0001 },
    { name: 'jitter_ddp', label: 'Jitter:DDP', type: 'number', step: 0.0001 },
    { name: 'mdvp_shimmer', label: 'MDVP:Shimmer', type: 'number', step: 0.0001 },
    { name: 'mdvp_shimmer_db', label: 'MDVP:Shimmer(dB)', type: 'number', step: 0.01 },
    { name: 'shimmer_apq3', label: 'Shimmer:APQ3', type: 'number', step: 0.0001 },
    { name: 'shimmer_apq5', label: 'Shimmer:APQ5', type: 'number', step: 0.0001 },
    { name: 'mdvp_apq', label: 'MDVP:APQ', type: 'number', step: 0.0001 },
    { name: 'shimmer_dda', label: 'Shimmer:DDA', type: 'number', step: 0.0001 },
    { name: 'nhr', label: 'NHR', type: 'number', step: 0.0001 },
    { name: 'hnr', label: 'HNR', type: 'number', step: 0.01 },
    { name: 'rpde', label: 'RPDE', type: 'number', step: 0.0001 },
    { name: 'dfa', label: 'DFA', type: 'number', step: 0.0001 },
    { name: 'spread1', label: 'spread1', type: 'number', step: 0.0001 },
    { name: 'spread2', label: 'spread2', type: 'number', step: 0.0001 },
    { name: 'd2', label: 'D2', type: 'number', step: 0.0001 },
    { name: 'ppe', label: 'PPE', type: 'number', step: 0.0001 }
];

// Function to create form fields
function createFormFields(fields, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'mb-3';
        
        const label = document.createElement('label');
        label.className = 'form-label';
        label.textContent = field.label;
        
        const input = document.createElement('input');
        input.type = field.type;
        input.className = 'form-control';
        input.name = field.name;
        input.required = true;
        
        if (field.min !== undefined) input.min = field.min;
        if (field.max !== undefined) input.max = field.max;
        if (field.step !== undefined) input.step = field.step;
        
        div.appendChild(label);
        div.appendChild(input);
        container.appendChild(div);
    });
}

// Handle disease type selection
document.getElementById('diseaseType').addEventListener('change', function() {
    const diabetesFields = document.getElementById('diabetesFields');
    const heartFields = document.getElementById('heartFields');
    const parkinsonFields = document.getElementById('parkinsonFields');
    
    // Hide all fields
    diabetesFields.style.display = 'none';
    heartFields.style.display = 'none';
    parkinsonFields.style.display = 'none';
    
    // Show selected fields
    switch(this.value) {
        case 'diabetes':
            diabetesFields.style.display = 'block';
            break;
        case 'heart':
            createFormFields(heartFields, 'heartFields');
            heartFields.style.display = 'block';
            break;
        case 'parkinson':
            createFormFields(parkinsonFields, 'parkinsonFields');
            parkinsonFields.style.display = 'block';
            break;
    }
});

// Handle metadata form submission
document.getElementById('metadataForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    showLoading();
    
    const diseaseType = document.getElementById('diseaseType').value;
    const formData = new FormData(this);
    const features = [];
    
    // Collect features based on disease type
    if (diseaseType === 'diabetes') {
        features.push(
            formData.get('pregnancies'),
            formData.get('glucose'),
            formData.get('blood_pressure'),
            formData.get('skin_thickness'),
            formData.get('insulin'),
            formData.get('bmi'),
            formData.get('pedigree'),
            formData.get('age')
        );
    } else if (diseaseType === 'heart') {
        heartFields.forEach(field => {
            features.push(formData.get(field.name));
        });
    } else if (diseaseType === 'parkinson') {
        parkinsonFields.forEach(field => {
            features.push(formData.get(field.name));
        });
    }
    
    try {
        const response = await fetch('/predict_metadata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                disease: diseaseType,
                features: features.map(Number)
            })
        });
        
        const result = await response.json();
        displayResult(result);
    } catch (error) {
        alert('An error occurred while processing your request');
        console.error(error);
    } finally {
        hideLoading();
    }
});

// Handle image form submission
document.getElementById('imageForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    showLoading();
    
    const formData = new FormData();
    formData.append('file', document.getElementById('imageFile').files[0]);
    formData.append('disease', document.getElementById('imageDiseaseType').value);
    
    try {
        const response = await fetch('/predict_image', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        displayResult(result);
    } catch (error) {
        alert('An error occurred while processing your request');
        console.error(error);
    } finally {
        hideLoading();
    }
});

// Display result in modal
function displayResult(result) {
    const resultContent = document.getElementById('resultContent');
    const modal = new bootstrap.Modal(document.getElementById('resultModal'));
    
    let html = `
        <div class="text-center">
            <h4>${result.disease.replace('_', ' ').toUpperCase()} Prediction</h4>
            <p class="result-${result.prediction.toLowerCase()}">Result: ${result.prediction}</p>
            <p>Confidence: ${(result.confidence * 100).toFixed(2)}%</p>
        </div>
    `;
    
    resultContent.innerHTML = html;
    modal.show();
}

// Loading functions
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div class="loading-spinner"></div>
        <p class="mt-2">Processing your request...</p>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
} 