// Lấy danh sách các kỹ năng và mức điểm từ thuộc tính data của các thẻ li
const skills = [];
const scores = [];
$("#skills li").each(function() {
    const skill = $(this).data("skill");
    const score = $(this).data("score");
    skills.push(skill);
    scores.push(score);
});

// Vẽ biểu đồ cột
const ctx = document.getElementById("skillsChart").getContext("2d");
new Chart(ctx, {
    type: "bar",
    data: {
        labels: skills,
        datasets: [{
            label: "Điểm",
            data: scores,
            backgroundColor: [
                "rgba(75, 192, 192, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 99, 132, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(153, 102, 255, 0.7)",
            ],
            borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});
