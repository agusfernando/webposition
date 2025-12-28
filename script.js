let map;
let marker;
let userLatitude = null;
let userLongitude = null;

// Initialize map function (will be called by Google Maps API)
function initMap() {
    // Map will be initialized when location is obtained
}

// Get user's location
function getLocation() {
    const statusDiv = document.getElementById('status');
    const locationInfo = document.getElementById('locationInfo');
    const getLocationBtn = document.getElementById('getLocationBtn');
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
        statusDiv.className = 'status error';
        statusDiv.textContent = 'Geolocation tidak didukung oleh browser Anda.';
        return;
    }
    
    // Show loading state
    statusDiv.className = 'status loading';
    statusDiv.textContent = 'Mengambil posisi Anda...';
    getLocationBtn.disabled = true;
    locationInfo.classList.add('hidden');
    
    // Get current position
    navigator.geolocation.getCurrentPosition(
        // Success callback
        function(position) {
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            
            // Update UI
            document.getElementById('latitude').textContent = userLatitude.toFixed(6);
            document.getElementById('longitude').textContent = userLongitude.toFixed(6);
            document.getElementById('accuracy').textContent = accuracy.toFixed(2) + ' meter';
            
            // Show success status
            statusDiv.className = 'status success';
            statusDiv.textContent = 'Posisi berhasil ditemukan!';
            
            // Show location info
            locationInfo.classList.remove('hidden');
            getLocationBtn.disabled = false;
            
            // Initialize and show map
            if (typeof google !== 'undefined' && google.maps) {
                initializeMap(userLatitude, userLongitude);
            } else {
                // If Google Maps API is not loaded, show a simple map link
                showSimpleMap();
            }
        },
        // Error callback
        function(error) {
            let errorMessage = 'Terjadi kesalahan saat mengambil posisi.';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Akses lokasi ditolak. Silakan izinkan akses lokasi di pengaturan browser.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Informasi lokasi tidak tersedia.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Waktu permintaan lokasi habis.';
                    break;
            }
            
            statusDiv.className = 'status error';
            statusDiv.textContent = errorMessage;
            getLocationBtn.disabled = false;
        },
        // Options
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Initialize Google Maps
function initializeMap(lat, lng) {
    const mapContainer = document.getElementById('map');
    
    map = new google.maps.Map(mapContainer, {
        center: { lat: lat, lng: lng },
        zoom: 15,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
    });
    
    marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: 'Lokasi Anda',
        animation: google.maps.Animation.DROP
    });
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0;">Lokasi Anda</h3>
                <p style="margin: 5px 0;"><strong>Latitude:</strong> ${lat.toFixed(6)}</p>
                <p style="margin: 5px 0;"><strong>Longitude:</strong> ${lng.toFixed(6)}</p>
            </div>
        `
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    infoWindow.open(map, marker);
}

// Show simple map (fallback if Google Maps API is not available)
function showSimpleMap() {
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #e0e0e0;">
            <p style="margin-bottom: 15px; color: #666;">Gunakan tombol "Buka di Google Maps" untuk melihat peta</p>
            <a href="https://www.google.com/maps?q=${userLatitude},${userLongitude}" 
               target="_blank" 
               style="padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">
                Buka di Google Maps
            </a>
        </div>
    `;
}

// Open location in Google Maps
function openInGoogleMaps() {
    if (userLatitude && userLongitude) {
        const url = `https://www.google.com/maps?q=${userLatitude},${userLongitude}`;
        window.open(url, '_blank');
    }
}

// Copy coordinates to clipboard
function copyCoordinates() {
    if (userLatitude && userLongitude) {
        const coords = `${userLatitude}, ${userLongitude}`;
        navigator.clipboard.writeText(coords).then(() => {
            const btn = document.getElementById('copyCoordsBtn');
            const originalText = btn.textContent;
            btn.textContent = '✓ Tersalin!';
            btn.style.background = '#4caf50';
            btn.style.color = 'white';
            btn.style.borderColor = '#4caf50';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 2000);
        }).catch(err => {
            alert('Gagal menyalin koordinat. Silakan salin manual: ' + coords);
        });
    }
}

// Validate and format phone number
function validatePhoneNumber(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's a valid number (at least 10 digits, max 15 digits)
    if (cleaned.length < 10 || cleaned.length > 15) {
        return null;
    }
    
    // If starts with 0, replace with 62 (Indonesia country code)
    if (cleaned.startsWith('0')) {
        return '62' + cleaned.substring(1);
    }
    
    // If doesn't start with country code, assume it's Indonesian number and add 62
    if (!cleaned.startsWith('62')) {
        return '62' + cleaned;
    }
    
    return cleaned;
}

// Generate WhatsApp message with location
function generateWhatsAppMessage(phoneNumber, couponCode = null) {
    let message = 'Hi, gunakan lokasi ini untuk pengiriman paketnya ya';
    
    if (userLatitude && userLongitude) {
        // Add Google Maps link
        const mapsUrl = `https://www.google.com/maps?q=${userLatitude},${userLongitude}`;
        message += `\n\nGoogle Maps: ${mapsUrl}`;
    }
    
    // Add phone number (required)
    message += `\n\nNomor handphone: ${phoneNumber}`;
    
    // Add coupon code if provided
    if (couponCode && couponCode.trim()) {
        message += `\n\nKode kupon: ${couponCode.trim()}`;
    }
    
    return message;
}

// Open WhatsApp with phone number
function openWhatsApp() {
    // Default phone number for WhatsApp delivery
    const defaultPhone = '6285760820750';
    
    // Get phone number from input (required)
    const phoneInput = document.getElementById('phoneNumber');
    const phoneNumber = phoneInput.value.trim();
    
    // Check if phone number is filled
    if (!phoneNumber) {
        alert('Nomor handphone wajib diisi!');
        phoneInput.focus();
        phoneInput.style.borderColor = '#c62828';
        setTimeout(() => {
            phoneInput.style.borderColor = '#ddd';
        }, 2000);
        return;
    }
    
    // Validate phone number
    const validatedPhone = validatePhoneNumber(phoneNumber);
    
    if (!validatedPhone) {
        alert('Nomor handphone tidak valid. Silakan masukkan nomor yang benar.\nContoh: 6281234567890 atau 081234567890');
        phoneInput.focus();
        phoneInput.style.borderColor = '#c62828';
        setTimeout(() => {
            phoneInput.style.borderColor = '#ddd';
        }, 2000);
        return;
    }
    
    // Check if location is available
    if (!userLatitude || !userLongitude) {
        const confirmOpen = confirm('Lokasi belum didapatkan. Apakah Anda ingin membuka WhatsApp tanpa koordinat lokasi?\n\nKlik "OK" untuk membuka WhatsApp, atau "Cancel" untuk mendapatkan lokasi terlebih dahulu.');
        if (!confirmOpen) {
            return;
        }
    }
    
    // Get coupon code from input (optional)
    const couponInput = document.getElementById('couponCode');
    const couponCode = couponInput ? couponInput.value.trim() : '';
    
    // Generate message with phone number and coupon code
    const message = generateWhatsAppMessage(validatedPhone, couponCode);
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp Web/App with default phone number and pre-filled message
    const whatsappUrl = `https://wa.me/${defaultPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getLocationBtn').addEventListener('click', getLocation);
    document.getElementById('openMapsBtn').addEventListener('click', openInGoogleMaps);
    document.getElementById('copyCoordsBtn').addEventListener('click', copyCoordinates);
    document.getElementById('openWhatsAppBtn').addEventListener('click', openWhatsApp);
    
    // Allow Enter key to open WhatsApp
    document.getElementById('phoneNumber').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            openWhatsApp();
        }
    });
    
    // Format phone number as user types (remove non-digits)
    document.getElementById('phoneNumber').addEventListener('input', function(e) {
        // Allow only digits
        this.value = this.value.replace(/\D/g, '');
    });
});

