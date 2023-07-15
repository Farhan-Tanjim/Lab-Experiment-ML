document.getElementById("sizeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    classifySize();
});

function classifySize() {
    var height = parseInt(document.getElementById("height").value);
    var weight = parseInt(document.getElementById("weight").value);
    var choice = parseInt(document.getElementById("choice").value);
    var k = parseInt(document.getElementById("k").value);


    function classifyAPoint(dataset, size, p, k, choice) {
        var distance = [];
        var freq1 = 0, freq2 = 0;

        for (var group in dataset) {
            for (var i = 0; i < dataset[group].length; i++) {
                var feature = dataset[group][i];
                var xDiff = feature[0] - p[0];
                var yDiff = feature[1] - p[1];
                var dist;

                if (choice === 1) {
                    dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
                } else {
                    dist = Math.abs(xDiff) + Math.abs(yDiff);
                }

                distance.push({ dist: dist, group: group });
            }
        }

        distance.sort(function(a, b) {
            return a.dist - b.dist;
        });

        for (var i = 0; i < k; i++) {
            if (distance[i].group === '0') {
                freq1++;
            } else if (distance[i].group === '1') {
                freq2++;
            }
        }

        return freq1 > freq2 ? 0 : 1;
    }


    var size = Object.keys(dataset).length;

    var result = classifyAPoint(dataset, size, [height, weight], k, choice);

    var resultText = result === 0 ? "Mr. Perfect's T-Shirt size is M" : "Mr. Perfect's T-Shirt size is L";
    document.getElementById("result").textContent = resultText;
}

 function setDefaultValues() {
    document.getElementById("height").value = "162";
    document.getElementById("weight").value = "62";
    document.getElementById("choice").value = "1";
    document.getElementById("k").value = "3";
}

function resetForm() {
    document.getElementById("sizeForm").reset();
    document.getElementById("result").textContent = "";
}