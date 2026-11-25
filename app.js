const $=id=>document.getElementById(id);
function number(id){return Number($(id).value)}
$('attendanceBtn').onclick=()=>{let total=number('conducted'),attended=number('attended'),required=number('required'),out=$('attendanceResult');
if(!Number.isInteger(total)||!Number.isInteger(attended)||total<0||attended<0||attended>total||required<=0||required>100){out.innerHTML='<span class="error">Enter valid values. Attended classes cannot exceed total classes.</span>';return}
if(total===0){out.textContent='No classes have been conducted yet.';return}
let pct=attended/total*100;let message=`<strong>${pct.toFixed(2)}%</strong><br>Current attendance`;
if(pct>=required){let canMiss=Math.floor((attended/ (required/100))-total);message+=`<br><span class="good">You can miss up to ${Math.max(0,canMiss)} consecutive upcoming classes and remain at or above ${required}%.</span>`}
else{let need=Math.ceil((required*total/100-attended)/(1-required/100));message+=`<br><span class="warn">Attend the next ${Math.max(0,need)} classes consecutively to reach ${required}%.</span>`}
out.innerHTML=message};
$('marksBtn').onclick=()=>{let done=number('completedCount'),current=number('currentAverage'),left=number('remainingCount'),target=number('targetAverage'),out=$('marksResult');
if(!Number.isInteger(done)||!Number.isInteger(left)||done<0||left<1||current<0||current>100||target<0||target>100){out.innerHTML='<span class="error">Enter valid counts and percentages (0–100).</span>';return}
if(done===0){out.innerHTML='<span class="error">Enter at least one completed exam/subject and its current average.</span>';return}
let needed=(target*(done+left)-current*done)/left;
if(needed>100)out.innerHTML=`<span class="warn">You would need ${needed.toFixed(2)}% in each remaining exam on average. This target is not achievable if the maximum is 100%.</span>`;
else if(needed<=0)out.innerHTML=`<span class="good">Your current average already meets the target. Maintain your performance.</span>`;
else out.innerHTML=`<strong>${needed.toFixed(2)}%</strong><br>Average needed across the remaining ${left} exams to reach ${target}% overall.`;
};
$('attendanceBtn').click();$('marksBtn').click();
