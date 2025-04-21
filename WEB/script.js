// Lấy các phần tử
const homeLink = document.querySelector('.sidebar ul li:nth-child(1) a'); // Mục "Trang chủ"
const controlLink = document.querySelector('.sidebar ul li:nth-child(2) a'); // Mục "Điều khiển"
const monitorLink = document.querySelector('.sidebar ul li:nth-child(3) a'); // Mục "Giám sát"
const homeSection = document.querySelector('.home-section');
const controlSection = document.querySelector('.control-section');
const monitorSection = document.querySelector('.monitor-section');

// Hàm ẩn tất cả các section
function hideAllSections() {
    homeSection.style.display = 'none';
    controlSection.style.display = 'none';
    monitorSection.style.display = 'none';
}

// Xử lý khi nhấp vào "Trang chủ"
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    homeSection.style.display = 'block';
});

// Xử lý khi nhấp vào "Điều khiển"
controlLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    controlSection.style.display = 'block';
});

// Xử lý khi nhấp vào "Giám sát"
monitorLink.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    monitorSection.style.display = 'block';
});

// Khởi tạo biểu đồ cho phần "Giám sát"
// khoi tao cac thong so
let btn1 = document.querySelector('#btn1');
let img1 = document.querySelector('#img');
let btn2 = document.querySelector('#btn2');
const statusTexts = document.querySelectorAll('.status-text');
// functions nut bam
// const database=firebase.database();
// const deviceRef=database.ref('quan1');

btn1.addEventListener('click', ()=>{
    document.querySelector('.control-card:nth-child(1) .status-text').textContent = 'Đang mở';
    img1.src = 'image/door (1).png'; 
    firebase.database().ref("thietbi1").set({door: 1})
})
btn2.addEventListener('click', ()=>{
    document.querySelector('.control-card:nth-child(1) .status-text').textContent = 'Đang đóng';
    img1.src = 'image/door.png';
    firebase.database().ref("thietbi1").set({door: 0})
})

// khoi tao cac thong so
let btn3 = document.querySelector('#btn3');
let img2 = document.querySelector('#den');
let btn4 = document.querySelector('#btn4');
// functions nut bam
btn3.addEventListener('click', ()=>{
    document.querySelector('.control-card:nth-child(2) .status-text').textContent = 'Đang bật';
    img2.src = 'image/denon1.gif'; 
    firebase.database().ref("thietbi2").set({den1:1})
})

btn4.addEventListener('click', ()=>{
    document.querySelector('.control-card:nth-child(2) .status-text').textContent = 'Đang tắt'
    img2.src = 'image/den1.png';
    firebase.database().ref("thietbi2").set({den1:0})
})



// khoi tao cac thong s
let btn5 = document.querySelector('#btn5');
let img3 = document.querySelector('#quat');
let btn6 = document.querySelector('#btn6');

// functions nut bam
btn5.addEventListener('click', ()=>{
     document.querySelector('.control-card:nth-child(3) .status-text').textContent = 'Đang bật';
     img3.src = 'image/fan_on.gif' ;
     firebase.database().ref("thietbi3").set({quat:1})

})
btn6.addEventListener('click', ()=>{
    document.querySelector('.control-card:nth-child(3) .status-text').textContent = 'Đang tắt';
    img3.src = 'image/fan.png';
    firebase.database().ref("thietbi3").set({quat: 0})

})
// Cài đặt ngưỡng nhiệt độ
const TEMP_THRESHOLD = 35; // Ngưỡng nhiệt độ cảnh báo (có thể điều chỉnh)
const HUMIDITY_THRESHOLD_HIGH = 70; // Ngưỡng độ ẩm cao
const HUMIDITY_THRESHOLD_LOW = 30;  // Ngưỡng độ ẩm thấp
const GAS_THRESHOLD = 800;           // Ngưỡng khí gas (PM2.5)

// Hàm kiểm tra và cảnh báo nhiệt độ
function checkTemperature(temp) {
    const tempCard = document.getElementById('temp-card');
    const statusElement = tempCard.querySelector('.sensor-status');
    
    // Xóa tất cả các class trạng thái cũ
    statusElement.classList.remove('status-normal', 'status-warning', 'status-critical');
    tempCard.classList.remove('warning', 'critical');
    
    if (temp > TEMP_THRESHOLD) {
        // Nhiệt độ vượt ngưỡng
        statusElement.textContent = 'Cảnh báo!';
        statusElement.classList.add('status-critical');
        tempCard.classList.add('critical');
        
        // Thêm cảnh báo vào danh sách
        addAlert('danger', `Nhiệt độ cao: ${temp}°C`, 'fa-thermometer-full');
    } else if (temp > TEMP_THRESHOLD - 5) {
        // Nhiệt độ gần ngưỡng
        statusElement.textContent = 'Gần ngưỡng';
        statusElement.classList.add('status-warning');
        tempCard.classList.add('warning');
    } else {
        // Bình thường
        statusElement.textContent = 'Bình thường';
        statusElement.classList.add('status-normal');
    }
}

// Hàm thêm cảnh báo
function addAlert(type, message, icon) {
    const alertList = document.getElementById('alert-list');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type}`;
    alertElement.innerHTML = `
        <i class="fas ${icon}"></i>
        <span class="alert-time">${timeString}</span>
        <span class="alert-message">${message}</span>
        <i class="fas fa-times alert-close"></i>
    `;
    
    // Thêm vào đầu danh sách
    alertList.insertBefore(alertElement, alertList.firstChild);
    
    // Giới hạn số cảnh báo hiển thị
    if (alertList.children.length > 5) {
        alertList.removeChild(alertList.lastChild);
    }
    
    // Tự động xóa sau 10s
    setTimeout(() => {
        alertElement.classList.add('fade-out');
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.parentNode.removeChild(alertElement);
            }
        }, 500);
    }, 10000);
}

// Thêm sự kiện đóng cảnh báo
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('alert-close')) {
        e.target.parentElement.remove();
    }
});
function checkHumidity(humi) {
    const humidityCard = document.getElementById('humidity-card');
    const statusElement = humidityCard.querySelector('.sensor-status');
    
    // Xóa tất cả các class trạng thái cũ
    statusElement.classList.remove('status-normal', 'status-warning', 'status-critical');
    humidityCard.classList.remove('warning', 'critical');
    
    if (humi > HUMIDITY_THRESHOLD_HIGH) {
        // Độ ẩm vượt ngưỡng cao
        statusElement.textContent = 'Quá ẩm!';
        statusElement.classList.add('status-critical');
        humidityCard.classList.add('critical');
        
        // Thêm cảnh báo vào danh sách
        addAlert('danger', `Độ ẩm cao: ${humi}%`, 'fa-tint');
    } else if (humi < HUMIDITY_THRESHOLD_LOW) {
        // Độ ẩm dưới ngưỡng thấp
        statusElement.textContent = 'Quá khô!';
        statusElement.classList.add('status-warning');
        humidityCard.classList.add('warning');
        
        // Thêm cảnh báo vào danh sách
        addAlert('warning', `Độ ẩm thấp: ${humi}%`, 'fa-tint');
    } else {
        // Bình thường
        statusElement.textContent = 'Bình thường';
        statusElement.classList.add('status-normal');
    }
}

// Hàm kiểm tra và cảnh báo khí gas (PM2.5)
function checkGas(gas) {
    const gasCard = document.getElementById('pm25-card');
    const statusElement = gasCard.querySelector('.sensor-status');
    
    // Xóa tất cả các class trạng thái cũ
    statusElement.classList.remove('status-normal', 'status-warning', 'status-critical');
    gasCard.classList.remove('warning', 'critical');
    
    if (gas > GAS_THRESHOLD) {
        // Khí gas vượt ngưỡng
        statusElement.textContent = 'Nguy hiểm!';
        statusElement.classList.add('status-critical');
        gasCard.classList.add('critical');
        
        // Thêm cảnh báo vào danh sách
        addAlert('danger', `PM2.5 cao: ${gas} µg/m³`, 'fa-smog');
    } else if (gas > GAS_THRESHOLD - 15) {
        // Khí gas gần ngưỡng
        statusElement.textContent = 'Hơi cao';
        statusElement.classList.add('status-warning');
        gasCard.classList.add('warning');
    } else {
        // Bình thường
        statusElement.textContent = 'Tốt';
        statusElement.classList.add('status-normal');
    }
}
// Biến lưu trữ dữ liệu nhiệt độ
// Biến lưu trữ dữ liệu và tham chiếu biểu đồ
// Cấu hình chung
const chartsConfig = {
  temp: {
    id: 'tempChart',
    title: 'Nhiệt độ',
    unit: '°C',
    color: 'rgba(255, 99, 132, 0.7)',
    warningThreshold: 30
  },
  humi: {
    id: 'humiChart',
    title: 'Độ ẩm',
    unit: '%',
    color: 'rgba(54, 162, 235, 0.7)',
    warningThreshold: 70
  },
  gas: {
    id: 'gasChart',
    title: 'Khí gas',
    unit: 'ppm',
    color: 'rgba(75, 192, 192, 0.7)',
    warningThreshold: 50
  }
};

// Khởi tạo tất cả biểu đồ
function initAllCharts() {
  Object.keys(chartsConfig).forEach(type => {
    const config = chartsConfig[type];
    const ctx = document.getElementById(config.id).getContext('2d');

    config.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: `${config.title} (${config.unit})`,
          data: [],
          backgroundColor: config.color,
          borderColor: config.color.replace('0.7', '1'),
          borderWidth: 1,
          barThickness: 20
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  });
}

// Cập nhật biểu đồ
function updateChart(type, value) {
  const config = chartsConfig[type];
  const now = new Date();
  const timeLabel = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

  // Cập nhật giá trị hiện tại
  document.getElementById(`current${type.charAt(0).toUpperCase() + type.slice(1)}`).textContent =
    `${value}${config.unit}`;

  // Thêm dữ liệu mới
  config.chart.data.labels.push(timeLabel);
  config.chart.data.datasets[0].data.push(value);

  // Giới hạn dữ liệu
  if (config.chart.data.labels.length > 8) {
    config.chart.data.labels.shift();
    config.chart.data.datasets[0].data.shift();
  }

  // Đổi màu nếu vượt ngưỡng
  config.chart.data.datasets[0].backgroundColor =
    value > config.warningThreshold
      ? 'rgba(231, 76, 60, 0.7)'
      : config.color;

  config.chart.update();
}

// Kết nối Firebase và cập nhật biểu đồ khi dữ liệu thay đổi
function connectFirebase() {
  Object.keys(chartsConfig).forEach(type => {
    const path = `Coso_IOT/${type.charAt(0).toUpperCase() + type.slice(1)}`;
    firebase.database().ref(path).on('value', snapshot => {
      const value = parseFloat(snapshot.val());
      if (!isNaN(value)) updateChart(type, value);
    });
  });
}

  
  // Khởi động
  document.addEventListener('DOMContentLoaded', () => {
    initAllCharts();
    connectFirebase();
  });