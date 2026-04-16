const { useState, useEffect } = React;

const COLORS = {
navy: “#0B1D3A”,
navyLight: “#132B52”,
navyMid: “#1A3668”,
gold: “#D4A853”,
goldLight: “#E8C97A”,
goldDark: “#B8903F”,
cream: “#FFF8EE”,
creamDark: “#F0E6D4”,
white: “#FFFFFF”,
slate: “#64748B”,
green: “#22C55E”,
red: “#EF4444”,
orange: “#F59E0B”,
};

const SERVICES = [
{ id: “wash-fold”, name: “Wash & Fold”, price: 15.00, unit: “per load”, icon: “\u{1F9FA}”, minLbs: null, note: “Includes machine cost & detergent” },
];

const TIME_SLOTS = [
“8:00 AM”, “9:00 AM”, “10:00 AM”, “11:00 AM”,
“12:00 PM”, “1:00 PM”, “2:00 PM”, “3:00 PM”,
“4:00 PM”, “5:00 PM”, “6:00 PM”
];

const WAIVER_TEXT = “LIABILITY WAIVER & SERVICE AGREEMENT\n\nNoah & Juliet Laundry Services ("NJ Laundry")\n\nBy signing this agreement, the Customer acknowledges and agrees to the following terms:\n\n1. GARMENT CARE DISCLAIMER\nNJ Laundry will exercise reasonable care in handling all garments. However, NJ Laundry shall not be held liable for:\n\u2022 Pre-existing damage, wear, stains, or defects not noted at drop-off\n\u2022 Color bleeding, shrinkage, or fabric damage resulting from manufacturer defects or incorrect care labels\n\u2022 Items left in pockets (including but not limited to cash, jewelry, electronics)\n\u2022 Damage to garments with loose buttons, broken zippers, or weakened seams\n\u2022 Natural aging or deterioration of fabrics during the cleaning process\n\n2. VALUATION & LIABILITY LIMITS\n\u2022 Maximum liability per garment shall not exceed 10x the cleaning cost of that item\n\u2022 Claims must be filed within 48 hours of pickup/delivery\n\u2022 NJ Laundry reserves the right to inspect and assess all claims before resolution\n\n3. SPECIAL ITEMS\n\u2022 Delicate fabrics, vintage items, couture, or items of extraordinary value must be declared at drop-off\n\u2022 Additional care fees may apply for specialty items\n\u2022 NJ Laundry reserves the right to decline service on items deemed too fragile or risky\n\n4. UNCLAIMED GARMENTS\n\u2022 Items not claimed within 30 days of the scheduled pickup date will incur storage fees\n\u2022 Items unclaimed after 90 days may be donated or disposed of at NJ Laundry’s discretion\n\n5. SERVICE TERMS\n\u2022 Turnaround times are estimates and not guaranteed\n\u2022 Rush service is subject to availability and additional fees\n\u2022 NJ Laundry reserves the right to refuse service for any reason\n\n6. REWARDS PROGRAM\n\u2022 After every 7 paid services, the 8th service of equal or lesser value is complimentary\n\u2022 Rewards are non-transferable and have no cash value\n\u2022 NJ Laundry reserves the right to modify or discontinue the rewards program\n\nBy proceeding with service, the Customer confirms they have read, understood, and agree to all terms above.”;

const defaultAppData = {
currentUser: null,
users: {},
orders: [],
waiverSigned: false,
waiverSignDate: null,
waiverSignName: “”,
};

function Icon({ name, size = 20, color = COLORS.gold }) {
const s = { width: size, height: size, viewBox: “0 0 24 24”, fill: “none”, stroke: color, strokeWidth: “2” };
const icons = {
home: React.createElement(“svg”, s, React.createElement(“path”, {d:“M3 12l9-9 9 9”}), React.createElement(“path”, {d:“M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10”})),
calendar: React.createElement(“svg”, s, React.createElement(“rect”, {x:3,y:4,width:18,height:18,rx:2}), React.createElement(“line”, {x1:16,y1:2,x2:16,y2:6}), React.createElement(“line”, {x1:8,y1:2,x2:8,y2:6}), React.createElement(“line”, {x1:3,y1:10,x2:21,y2:10})),
star: React.createElement(“svg”, {…s, fill: color, strokeWidth:“1”}, React.createElement(“polygon”, {points:“12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2”})),
file: React.createElement(“svg”, s, React.createElement(“path”, {d:“M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z”}), React.createElement(“polyline”, {points:“14 2 14 8 20 8”})),
dollar: React.createElement(“svg”, s, React.createElement(“line”, {x1:12,y1:1,x2:12,y2:23}), React.createElement(“path”, {d:“M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6”})),
user: React.createElement(“svg”, s, React.createElement(“path”, {d:“M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2”}), React.createElement(“circle”, {cx:12,cy:7,r:4})),
check: React.createElement(“svg”, {…s, strokeWidth:“2.5”}, React.createElement(“polyline”, {points:“20 6 9 17 4 12”})),
gift: React.createElement(“svg”, s, React.createElement(“polyline”, {points:“20 12 20 22 4 22 4 12”}), React.createElement(“rect”, {x:2,y:7,width:20,height:5}), React.createElement(“line”, {x1:12,y1:22,x2:12,y2:7}), React.createElement(“path”, {d:“M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z”}), React.createElement(“path”, {d:“M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z”})),
back: React.createElement(“svg”, s, React.createElement(“polyline”, {points:“15 18 9 12 15 6”})),
history: React.createElement(“svg”, s, React.createElement(“circle”, {cx:12,cy:12,r:10}), React.createElement(“polyline”, {points:“12 6 12 12 16 14”})),
};
return icons[name] || null;
}

function AnimatedMount({ children, delay = 0 }) {
const [visible, setVisible] = useState(false);
useEffect(() => {
const t = setTimeout(() => setVisible(true), delay);
return () => clearTimeout(t);
}, [delay]);
return React.createElement(“div”, {
style: {
opacity: visible ? 1 : 0,
transform: visible ? “translateY(0)” : “translateY(16px)”,
transition: “all 0.5s cubic-bezier(0.22, 1, 0.36, 1)”,
}
}, children);
}

function HomeScreen({ appData, setScreen }) {
const user = appData.currentUser;
const userOrders = appData.orders.filter(o => o.userId === (user && user.id));
const completedCount = userOrders.filter(o => o.status === “completed”).length;
const rewardsProgress = completedCount % 7;
const freeServicesEarned = Math.floor(completedCount / 7);
const activeOrders = userOrders.filter(o => o.status !== “completed” && o.status !== “cancelled”);

return (
<div style={{ padding: “0 20px 100px” }}>
<AnimatedMount delay={0}>
<div style={{ background: “linear-gradient(135deg, “ + COLORS.navy + “, “ + COLORS.navyMid + “)”, borderRadius: 20, padding: “28px 24px”, marginBottom: 24, position: “relative”, overflow: “hidden” }}>
<div style={{ position: “absolute”, top: -30, right: -30, width: 120, height: 120, borderRadius: “50%”, background: “radial-gradient(circle, “ + COLORS.gold + “15, transparent)” }} />
<div style={{ fontSize: 14, color: COLORS.goldLight, letterSpacing: 2, fontFamily: “‘Cormorant Garamond’, serif”, textTransform: “uppercase”, marginBottom: 4 }}>Welcome back</div>
<div style={{ fontSize: 26, color: COLORS.white, fontFamily: “‘Cormorant Garamond’, serif”, fontWeight: 700, marginBottom: 16 }}>{user ? user.name : “Guest”}</div>
<div style={{ display: “flex”, alignItems: “center”, gap: 12, background: COLORS.gold + “15”, borderRadius: 12, padding: “12px 16px” }}>
<Icon name="gift" size={22} />
<div>
<div style={{ fontSize: 13, color: COLORS.goldLight }}>{rewardsProgress}/7 towards free service</div>
<div style={{ fontSize: 11, color: COLORS.slate }}>{freeServicesEarned} free service{freeServicesEarned !== 1 ? “s” : “”} earned</div>
</div>
</div>
</div>
</AnimatedMount>

```
  <AnimatedMount delay={100}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
      {[
        { label: "Schedule", icon: "calendar", screen: "schedule", bg: COLORS.gold },
        { label: "Rewards", icon: "star", screen: "rewards", bg: COLORS.green },
        { label: "Payments", icon: "dollar", screen: "payments", bg: COLORS.orange },
        { label: "Waiver", icon: "file", screen: "waiver", bg: COLORS.navyMid },
      ].map(function(item) {
        return (
          <button key={item.screen} onClick={function() { setScreen(item.screen); }}
            style={{ background: COLORS.white, border: "1px solid " + COLORS.creamDark, borderRadius: 16, padding: "20px 16px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: item.bg + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={item.icon} size={24} color={item.bg} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  </AnimatedMount>

  <AnimatedMount delay={200}>
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy, margin: 0 }}>Active Orders</h3>
        <button onClick={function() { setScreen("history"); }} style={{ fontSize: 13, color: COLORS.gold, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>View All</button>
      </div>
      {activeOrders.length === 0 ? (
        <div style={{ background: COLORS.white, border: "1px dashed " + COLORS.creamDark, borderRadius: 16, padding: "32px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{"\u{1F9FA}"}</div>
          <div style={{ fontSize: 14, color: COLORS.slate }}>No active orders</div>
          <button onClick={function() { setScreen("schedule"); }}
            style={{ marginTop: 12, background: COLORS.gold, color: COLORS.white, border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Schedule a Service
          </button>
        </div>
      ) : (
        activeOrders.slice(0, 3).map(function(order) {
          return (
            <div key={order.id} style={{ background: COLORS.white, border: "1px solid " + COLORS.creamDark, borderRadius: 14, padding: 16, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{order.serviceName}</div>
                <div style={{ fontSize: 12, color: COLORS.slate, marginTop: 2 }}>{order.date} {"\u00B7"} {order.time}</div>
              </div>
              <div style={{ background: order.status === "confirmed" ? COLORS.green + "18" : COLORS.orange + "18", color: order.status === "confirmed" ? COLORS.green : COLORS.orange, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, textTransform: "capitalize" }}>
                {order.status}
              </div>
            </div>
          );
        })
      )}
    </div>
  </AnimatedMount>

  <AnimatedMount delay={300}>
    <div style={{ background: COLORS.gold + "10", border: "1px solid " + COLORS.gold + "30", borderRadius: 16, padding: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, marginBottom: 6 }}>Our Services</div>
      {SERVICES.map(function(s) {
        return (
          <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid " + COLORS.creamDark }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <div>
                <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.navy }}>{s.name}</span>
                {s.note && <div style={{ fontSize: 10, color: COLORS.slate }}>{s.note}</div>}
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.gold }}>{"$" + s.price.toFixed(2)} <span style={{ fontWeight: 400, fontSize: 11, color: COLORS.slate }}>{s.unit}</span></span>
          </div>
        );
      })}
    </div>
  </AnimatedMount>
</div>
```

);
}

function ScheduleScreen({ appData, setAppData, setScreen }) {
const [step, setStep] = useState(2);
const [selectedService, setSelectedService] = useState(“wash-fold”);
const [selectedDate, setSelectedDate] = useState(””);
const [selectedTime, setSelectedTime] = useState(””);
const [quantity, setQuantity] = useState(1);
const [notes, setNotes] = useState(””);
const [booked, setBooked] = useState(false);

var today = new Date();
var dates = [];
for (var i = 0; i < 14; i++) {
var d = new Date(today);
d.setDate(d.getDate() + i + 1);
dates.push(d);
}

var formatDate = function(d) { return d.toLocaleDateString(“en-US”, { weekday: “short”, month: “short”, day: “numeric” }); };

var handleBook = function() {
if (!appData.waiverSigned) {
alert(“Please sign the liability waiver before scheduling a service.”);
setScreen(“waiver”);
return;
}
var svc = SERVICES.find(function(s) { return s.id === selectedService; });
var order = {
id: “ORD-” + Date.now(),
userId: appData.currentUser ? appData.currentUser.id : null,
serviceId: selectedService,
serviceName: svc.name,
date: selectedDate,
time: selectedTime,
quantity: quantity,
notes: notes,
total: svc.price * quantity,
status: “confirmed”,
paymentStatus: “pending”,
createdAt: new Date().toISOString(),
};
setAppData(function(prev) { return Object.assign({}, prev, { orders: prev.orders.concat([order]) }); });
setBooked(true);
};

if (booked) {
var svc = SERVICES.find(function(s) { return s.id === selectedService; });
return (
<div style={{ padding: “0 20px 100px” }}>
<AnimatedMount>
<div style={{ textAlign: “center”, padding: “60px 20px” }}>
<div style={{ width: 80, height: 80, borderRadius: “50%”, background: COLORS.green + “18”, display: “flex”, alignItems: “center”, justifyContent: “center”, margin: “0 auto 20px” }}>
<Icon name="check" size={40} color={COLORS.green} />
</div>
<h2 style={{ fontSize: 24, fontWeight: 700, color: COLORS.navy, fontFamily: “‘Cormorant Garamond’, serif”, marginBottom: 8 }}>Booking Confirmed!</h2>
<p style={{ fontSize: 14, color: COLORS.slate, marginBottom: 24 }}>Your service has been scheduled successfully.</p>
<div style={{ background: COLORS.white, border: “1px solid “ + COLORS.creamDark, borderRadius: 16, padding: 20, textAlign: “left”, marginBottom: 24 }}>
<div style={{ fontSize: 13, color: COLORS.slate, marginBottom: 4 }}>Service</div>
<div style={{ fontSize: 15, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>{svc.name}</div>
<div style={{ fontSize: 13, color: COLORS.slate, marginBottom: 4 }}>Date & Time</div>
<div style={{ fontSize: 15, fontWeight: 600, color: COLORS.navy, marginBottom: 12 }}>{selectedDate} at {selectedTime}</div>
<div style={{ fontSize: 13, color: COLORS.slate, marginBottom: 4 }}>Estimated Total</div>
<div style={{ fontSize: 20, fontWeight: 700, color: COLORS.gold }}>{”$” + (svc.price * quantity).toFixed(2)}</div>
</div>
<button onClick={function() { setScreen(“home”); }} style={{ background: COLORS.navy, color: COLORS.white, border: “none”, borderRadius: 12, padding: “14px 32px”, fontSize: 15, fontWeight: 600, cursor: “pointer”, width: “100%” }}>Back to Home</button>
</div>
</AnimatedMount>
</div>
);
}

return (
<div style={{ padding: “0 20px 100px” }}>
<div style={{ display: “flex”, gap: 8, marginBottom: 24 }}>
{[2, 3].map(function(s) {
return <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? COLORS.gold : COLORS.creamDark }} />;
})}
</div>

```
  <div style={{ background: COLORS.gold + "10", border: "1px solid " + COLORS.gold + "25", borderRadius: 14, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ fontSize: 28 }}>{"\u{1F9FA}"}</span>
    <div>
      <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.navy }}>Wash & Fold</div>
      <div style={{ fontSize: 12, color: COLORS.slate }}>$15.00 per load · Includes machine cost & detergent</div>
    </div>
  </div>

  {step === 2 && (
    <AnimatedMount>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, fontFamily: "'Cormorant Garamond', serif", marginBottom: 16 }}>Pick a Date & Time</h3>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.slate, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Date</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {dates.map(function(d, i) {
            var dayName = d.toLocaleDateString("en-US", { weekday: "short" });
            return (
              <button key={i} onClick={function() { setSelectedDate(formatDate(d)); }}
                style={{ background: selectedDate === formatDate(d) ? COLORS.gold : COLORS.white, color: selectedDate === formatDate(d) ? COLORS.white : COLORS.navy, border: "1px solid " + (selectedDate === formatDate(d) ? COLORS.gold : COLORS.creamDark), borderRadius: 12, padding: "10px 8px", cursor: "pointer", minWidth: 64, textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.6 }}>{dayName}</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{d.getDate()}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.slate, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Time</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TIME_SLOTS.map(function(t) {
            return (
              <button key={t} onClick={function() { setSelectedTime(t); }}
                style={{ background: selectedTime === t ? COLORS.navy : COLORS.white, color: selectedTime === t ? COLORS.white : COLORS.navy, border: "1px solid " + (selectedTime === t ? COLORS.navy : COLORS.creamDark), borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
                {t}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={function() { setScreen("home"); }} style={{ flex: 1, background: COLORS.creamDark, color: COLORS.navy, border: "none", borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Back</button>
        <button onClick={function() { if (selectedDate && selectedTime) setStep(3); }} disabled={!selectedDate || !selectedTime}
          style={{ flex: 2, background: selectedDate && selectedTime ? COLORS.gold : COLORS.creamDark, color: selectedDate && selectedTime ? COLORS.white : COLORS.slate, border: "none", borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 600, cursor: selectedDate && selectedTime ? "pointer" : "not-allowed" }}>
          Continue
        </button>
      </div>
    </AnimatedMount>
  )}

  {step === 3 && (
    <AnimatedMount>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, fontFamily: "'Cormorant Garamond', serif", marginBottom: 16 }}>Review & Book</h3>
      <div style={{ background: COLORS.white, border: "1px solid " + COLORS.creamDark, borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid " + COLORS.creamDark }}>
          <span style={{ fontSize: 14, color: COLORS.slate }}>Service</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>Wash & Fold</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid " + COLORS.creamDark }}>
          <span style={{ fontSize: 14, color: COLORS.slate }}>Date</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{selectedDate}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid " + COLORS.creamDark }}>
          <span style={{ fontSize: 14, color: COLORS.slate }}>Time</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{selectedTime}</span>
        </div>
        <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid " + COLORS.creamDark }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, color: COLORS.slate }}>Number of Loads</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={function() { setQuantity(Math.max(1, quantity - 1)); }} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid " + COLORS.creamDark, background: COLORS.white, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>{"\u2212"}</button>
              <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, minWidth: 24, textAlign: "center" }}>{quantity}</span>
              <button onClick={function() { setQuantity(quantity + 1); }} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid " + COLORS.creamDark, background: COLORS.white, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>+</button>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy }}>Estimated Total</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: COLORS.gold }}>{"$" + (15 * quantity).toFixed(2)}</span>
        </div>
      </div>
      <textarea value={notes} onChange={function(e) { setNotes(e.target.value); }} placeholder="Special instructions or notes..."
        style={{ width: "100%", minHeight: 80, borderRadius: 12, border: "1px solid " + COLORS.creamDark, padding: 14, fontSize: 14, fontFamily: "'DM Sans', sans-serif", resize: "vertical", marginBottom: 16, boxSizing: "border-box" }} />
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={function() { setStep(2); }} style={{ flex: 1, background: COLORS.creamDark, color: COLORS.navy, border: "none", borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Back</button>
        <button onClick={handleBook} style={{ flex: 2, background: COLORS.gold, color: COLORS.white, border: "none", borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Confirm Booking</button>
      </div>
    </AnimatedMount>
  )}
</div>
```

);
}

function RewardsScreen({ appData }) {
var user = appData.currentUser;
var userOrders = appData.orders.filter(function(o) { return o.userId === (user && user.id) && o.status === “completed”; });
var completedCount = userOrders.length;
var rewardsProgress = completedCount % 7;
var freeServicesEarned = Math.floor(completedCount / 7);
var freeServicesUsed = userOrders.filter(function(o) { return o.isRewardRedemption; }).length;
var stamps = [];
for (var i = 0; i < 7; i++) stamps.push(i < rewardsProgress);

return (
<div style={{ padding: “0 20px 100px” }}>
<AnimatedMount>
<div style={{ background: “linear-gradient(135deg, “ + COLORS.navy + “, “ + COLORS.navyMid + “)”, borderRadius: 20, padding: “32px 24px”, textAlign: “center”, marginBottom: 24 }}>
<Icon name="gift" size={40} color={COLORS.gold} />
<h2 style={{ fontSize: 28, fontWeight: 700, color: COLORS.white, fontFamily: “‘Cormorant Garamond’, serif”, margin: “12px 0 4px” }}>Rewards Program</h2>
<p style={{ fontSize: 14, color: COLORS.goldLight, margin: 0 }}>Every 8th service is FREE!</p>
</div>
</AnimatedMount>

```
  <AnimatedMount delay={100}>
    <div style={{ background: COLORS.white, border: "1px solid " + COLORS.creamDark, borderRadius: 20, padding: "28px 24px", marginBottom: 20, textAlign: "center" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.slate, textTransform: "uppercase", letterSpacing: 1, marginBottom: 20 }}>Your Stamp Card</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {stamps.map(function(filled, i) {
          return (
            <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", background: filled ? COLORS.gold + "20" : COLORS.creamDark + "50", border: "2px solid " + (filled ? COLORS.gold : COLORS.creamDark), display: "flex", alignItems: "center", justifyContent: "center" }}>
              {filled ? <Icon name="star" size={20} color={COLORS.gold} /> : <span style={{ fontSize: 12, color: COLORS.creamDark, fontWeight: 700 }}>{i + 1}</span>}
            </div>
          );
        })}
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.green + "10", border: "2px dashed " + COLORS.creamDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 16 }}>{"\u{1F381}"}</span>
        </div>
      </div>
      <div style={{ fontSize: 14, color: COLORS.navy, fontWeight: 600 }}>{7 - rewardsProgress} more service{7 - rewardsProgress !== 1 ? "s" : ""} until your next free service!</div>
    </div>
  </AnimatedMount>

  <AnimatedMount delay={200}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
      <div style={{ background: COLORS.white, border: "1px solid " + COLORS.creamDark, borderRadius: 16, padding: 20, textAlign: "center" }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.gold, fontFamily: "'Cormorant Garamond', serif" }}>{completedCount}</div>
        <div style={{ fontSize: 12, color: COLORS.slate }}>Total Services</div>
      </div>
      <div style={{ background: COLORS.white, border: "1px solid " + COLORS.creamDark, borderRadius: 16, padding: 20, textAlign: "center" }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.green, fontFamily: "'Cormorant Garamond', serif" }}>{freeServicesEarned - freeServicesUsed}</div>
        <div style={{ fontSize: 12, color: COLORS.slate }}>Free Available</div>
      </div>
    </div>
  </AnimatedMount>
</div>
```

);
}

function PaymentsScreen({ appData, setAppData }) {
var user = appData.currentUser;
var userOrders = appData.orders.filter(function(o) { return o.userId === (user && user.id); });
var pendingOrders = userOrders.filter(function(o) { return o.paymentStatus === “pending”; });
var paidOrders = userOrders.filter(function(o) { return o.paymentStatus === “paid”; });
var totalSpent = paidOrders.reduce(function(sum, o) { return sum + o.total; }, 0);

var handlePay = function(orderId) {
setAppData(function(prev) {
return Object.assign({}, prev, { orders: prev.orders.map(function(o) { return o.id === orderId ? Object.assign({}, o, { paymentStatus: “paid”, paidAt: new Date().toISOString() }) : o; }) });
});
};

return (
<div style={{ padding: “0 20px 100px” }}>
<AnimatedMount>
<div style={{ background: “linear-gradient(135deg, “ + COLORS.navy + “, “ + COLORS.navyMid + “)”, borderRadius: 20, padding: “28px 24px”, marginBottom: 24 }}>
<div style={{ fontSize: 13, color: COLORS.goldLight, letterSpacing: 1, marginBottom: 4 }}>TOTAL SPENT</div>
<div style={{ fontSize: 36, fontWeight: 700, color: COLORS.white, fontFamily: “‘Cormorant Garamond’, serif” }}>{”$” + totalSpent.toFixed(2)}</div>
<div style={{ fontSize: 12, color: COLORS.slate, marginTop: 4 }}>{paidOrders.length} payment{paidOrders.length !== 1 ? “s” : “”} completed</div>
</div>
</AnimatedMount>

```
  <AnimatedMount delay={100}>
    <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>Pending Payments ({pendingOrders.length})</h3>
    {pendingOrders.length === 0 ? (
      <div style={{ background: COLORS.white, border: "1px dashed " + COLORS.creamDark, borderRadius: 16, padding: "28px 20px", textAlign: "center", marginBottom: 24 }}>
        <Icon name="check" size={32} color={COLORS.green} />
        <p style={{ fontSize: 14, color: COLORS.slate, margin: "8px 0 0" }}>All caught up! No pending payments.</p>
      </div>
    ) : (
      pendingOrders.map(function(order) {
        return (
          <div key={order.id} style={{ background: COLORS.white, border: "1px solid " + COLORS.creamDark, borderRadius: 14, padding: 16, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{order.serviceName}</div>
                <div style={{ fontSize: 12, color: COLORS.slate }}>{order.date}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.gold }}>{"$" + order.total.toFixed(2)}</div>
            </div>
            <button onClick={function() { handlePay(order.id); }}
              style={{ width: "100%", background: COLORS.green, color: COLORS.white, border: "none", borderRadius: 10, padding: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Pay Now
            </button>
          </div>
        );
      })
    )}
  </AnimatedMount>

  <AnimatedMount delay={200}>
    <h3 style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>Payment History</h3>
    {paidOrders.length === 0 ? (
      <div style={{ background: COLORS.white, border: "1px dashed " + COLORS.creamDark, borderRadius: 16, padding: "28px 20px", textAlign: "center" }}>
        <p style={{ fontSize: 14, color: COLORS.slate, margin: 0 }}>No payment history yet.</p>
      </div>
    ) : (
      paidOrders.map(function(order) {
        return (
          <div key={order.id} style={{ background: COLORS.white, border: "1px solid " + COLORS.creamDark, borderRadius: 14, padding: 16, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy }}>{order.serviceName}</div>
              <div style={{ fontSize: 12, color: COLORS.slate }}>{order.date}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy }}>{"$" + order.total.toFixed(2)}</div>
              <div style={{ fontSize: 11, color: COLORS.green, fontWeight: 600 }}>{"\u2713 Paid"}</div>
            </div>
          </div>
        );
      })
    )}
  </AnimatedMount>
</div>
```

);
}

function WaiverScreen({ appData, setAppData, setScreen }) {
const [sigName, setSigName] = useState(appData.waiverSignName || “”);
const [agreed, setAgreed] = useState(false);
const [signed, setSigned] = useState(appData.waiverSigned);

var handleSign = function() {
if (!sigName.trim() || !agreed) return;
setAppData(function(prev) { return Object.assign({}, prev, { waiverSigned: true, waiverSignDate: new Date().toISOString(), waiverSignName: sigName }); });
setSigned(true);
};

if (signed || appData.waiverSigned) {
return (
<div style={{ padding: “0 20px 100px” }}>
<AnimatedMount>
<div style={{ textAlign: “center”, padding: “40px 20px” }}>
<div style={{ width: 80, height: 80, borderRadius: “50%”, background: COLORS.green + “18”, display: “flex”, alignItems: “center”, justifyContent: “center”, margin: “0 auto 20px” }}>
<Icon name="check" size={40} color={COLORS.green} />
</div>
<h2 style={{ fontSize: 24, fontWeight: 700, color: COLORS.navy, fontFamily: “‘Cormorant Garamond’, serif”, marginBottom: 8 }}>Waiver Signed</h2>
<p style={{ fontSize: 14, color: COLORS.slate }}>Signed by <strong>{appData.waiverSignName}</strong> on {new Date(appData.waiverSignDate).toLocaleDateString(“en-US”, { year: “numeric”, month: “long”, day: “numeric” })}</p>
</div>
<div style={{ background: COLORS.white, border: “1px solid “ + COLORS.creamDark, borderRadius: 16, padding: 20, maxHeight: 300, overflowY: “auto” }}>
<pre style={{ fontSize: 11, color: COLORS.slate, whiteSpace: “pre-wrap”, fontFamily: “‘DM Sans’, sans-serif”, lineHeight: 1.6, margin: 0 }}>{WAIVER_TEXT}</pre>
</div>
</AnimatedMount>
</div>
);
}

return (
<div style={{ padding: “0 20px 100px” }}>
<AnimatedMount>
<div style={{ background: COLORS.orange + “10”, border: “1px solid “ + COLORS.orange + “30”, borderRadius: 14, padding: “14px 18px”, marginBottom: 20, display: “flex”, alignItems: “center”, gap: 10 }}>
<span style={{ fontSize: 20 }}>{”\u26A0\uFE0F”}</span>
<span style={{ fontSize: 13, color: COLORS.navy }}>Please read and sign this waiver before scheduling services.</span>
</div>
</AnimatedMount>
<AnimatedMount delay={100}>
<div style={{ background: COLORS.white, border: “1px solid “ + COLORS.creamDark, borderRadius: 16, padding: 20, maxHeight: 350, overflowY: “auto”, marginBottom: 20 }}>
<pre style={{ fontSize: 12, color: COLORS.navy, whiteSpace: “pre-wrap”, fontFamily: “‘DM Sans’, sans-serif”, lineHeight: 1.7, margin: 0 }}>{WAIVER_TEXT}</pre>
</div>
</AnimatedMount>
<AnimatedMount delay={200}>
<div style={{ marginBottom: 16 }}>
<label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: “block”, marginBottom: 6 }}>Full Legal Name</label>
<input type=“text” value={sigName} onChange={function(e) { setSigName(e.target.value); }} placeholder=“Enter your full name as signature”
style={{ width: “100%”, padding: “14px 16px”, borderRadius: 12, border: “1px solid “ + COLORS.creamDark, fontSize: 16, fontFamily: “‘Cormorant Garamond’, serif”, fontStyle: “italic”, boxSizing: “border-box” }} />
</div>
<div style={{ display: “flex”, alignItems: “flex-start”, gap: 12, cursor: “pointer”, marginBottom: 20 }} onClick={function() { setAgreed(!agreed); }}>
<div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, border: “2px solid “ + (agreed ? COLORS.gold : COLORS.creamDark), background: agreed ? COLORS.gold : “transparent”, display: “flex”, alignItems: “center”, justifyContent: “center”, marginTop: 1 }}>
{agreed && <Icon name="check" size={14} color={COLORS.white} />}
</div>
<span style={{ fontSize: 13, color: COLORS.navy, lineHeight: 1.4 }}>I have read, understood, and agree to the liability waiver and service agreement above.</span>
</div>
<button onClick={handleSign} disabled={!sigName.trim() || !agreed}
style={{ width: “100%”, padding: 16, background: sigName.trim() && agreed ? COLORS.gold : COLORS.creamDark, color: sigName.trim() && agreed ? COLORS.white : COLORS.slate, border: “none”, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: sigName.trim() && agreed ? “pointer” : “not-allowed” }}>
Sign Waiver
</button>
</AnimatedMount>
</div>
);
}

function HistoryScreen({ appData, setAppData }) {
var user = appData.currentUser;
var userOrders = appData.orders.filter(function(o) { return o.userId === (user && user.id); });

var handleComplete = function(orderId) {
setAppData(function(prev) { return Object.assign({}, prev, { orders: prev.orders.map(function(o) { return o.id === orderId ? Object.assign({}, o, { status: “completed” }) : o; }) }); });
};
var handleCancel = function(orderId) {
setAppData(function(prev) { return Object.assign({}, prev, { orders: prev.orders.map(function(o) { return o.id === orderId ? Object.assign({}, o, { status: “cancelled” }) : o; }) }); });
};

return (
<div style={{ padding: “0 20px 100px” }}>
<AnimatedMount>
<h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.navy, fontFamily: “‘Cormorant Garamond’, serif”, marginBottom: 16 }}>Order History</h3>
{userOrders.length === 0 ? (
<div style={{ textAlign: “center”, padding: “40px 20px” }}>
<div style={{ fontSize: 48, marginBottom: 12 }}>{”\u{1F4CB}”}</div>
<p style={{ fontSize: 14, color: COLORS.slate }}>No orders yet. Schedule your first service!</p>
</div>
) : (
userOrders.sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); }).map(function(order) {
return (
<div key={order.id} style={{ background: COLORS.white, border: “1px solid “ + COLORS.creamDark, borderRadius: 16, padding: 18, marginBottom: 12 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “flex-start”, marginBottom: 10 }}>
<div>
<div style={{ fontSize: 15, fontWeight: 600, color: COLORS.navy }}>{order.serviceName}</div>
<div style={{ fontSize: 12, color: COLORS.slate, marginTop: 2 }}>{order.date} {”\u00B7”} {order.time}</div>
</div>
<div style={{ textAlign: “right” }}>
<div style={{ fontSize: 16, fontWeight: 700, color: COLORS.gold }}>{”$” + order.total.toFixed(2)}</div>
<div style={{ fontSize: 11, fontWeight: 600, marginTop: 4, padding: “3px 8px”, borderRadius: 12, background: order.status === “completed” ? COLORS.green + “15” : order.status === “cancelled” ? COLORS.red + “15” : COLORS.orange + “15”, color: order.status === “completed” ? COLORS.green : order.status === “cancelled” ? COLORS.red : COLORS.orange, textTransform: “capitalize” }}>{order.status}</div>
</div>
</div>
{order.status === “confirmed” && (
<div style={{ display: “flex”, gap: 8 }}>
<button onClick={function() { handleComplete(order.id); }} style={{ flex: 1, background: COLORS.green + “12”, color: COLORS.green, border: “1px solid “ + COLORS.green + “30”, borderRadius: 8, padding: 8, fontSize: 12, fontWeight: 600, cursor: “pointer” }}>Mark Complete</button>
<button onClick={function() { handleCancel(order.id); }} style={{ flex: 1, background: COLORS.red + “08”, color: COLORS.red, border: “1px solid “ + COLORS.red + “20”, borderRadius: 8, padding: 8, fontSize: 12, fontWeight: 600, cursor: “pointer” }}>Cancel</button>
</div>
)}
</div>
);
})
)}
</AnimatedMount>
</div>
);
}

function ProfileScreen({ appData, setAppData }) {
var user = appData.currentUser;
const [name, setName] = useState(user ? user.name : “”);
const [email, setEmail] = useState(user ? user.email : “”);
const [phone, setPhone] = useState(user ? user.phone : “”);
const [saved, setSaved] = useState(false);

var handleSave = function() {
setAppData(function(prev) { return Object.assign({}, prev, { currentUser: Object.assign({}, prev.currentUser, { name: name, email: email, phone: phone }) }); });
setSaved(true);
setTimeout(function() { setSaved(false); }, 2000);
};

return (
<div style={{ padding: “0 20px 100px” }}>
<AnimatedMount>
<div style={{ textAlign: “center”, marginBottom: 28 }}>
<div style={{ width: 80, height: 80, borderRadius: “50%”, background: “linear-gradient(135deg, “ + COLORS.gold + “, “ + COLORS.goldDark + “)”, display: “flex”, alignItems: “center”, justifyContent: “center”, margin: “0 auto 12px”, fontSize: 32, color: COLORS.white, fontWeight: 700, fontFamily: “‘Cormorant Garamond’, serif” }}>
{name ? name[0].toUpperCase() : “?”}
</div>
<h3 style={{ fontSize: 22, fontWeight: 700, color: COLORS.navy, fontFamily: “‘Cormorant Garamond’, serif”, margin: 0 }}>{name || “Your Profile”}</h3>
</div>
</AnimatedMount>
<AnimatedMount delay={100}>
<div style={{ marginBottom: 16 }}>
<label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: “block”, marginBottom: 6 }}>Full Name</label>
<input type=“text” value={name} onChange={function(e) { setName(e.target.value); }} placeholder=“Your name” style={{ width: “100%”, padding: “14px 16px”, borderRadius: 12, border: “1px solid “ + COLORS.creamDark, fontSize: 15, fontFamily: “‘DM Sans’, sans-serif”, boxSizing: “border-box” }} />
</div>
<div style={{ marginBottom: 16 }}>
<label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: “block”, marginBottom: 6 }}>Email</label>
<input type=“email” value={email} onChange={function(e) { setEmail(e.target.value); }} placeholder=“your@email.com” style={{ width: “100%”, padding: “14px 16px”, borderRadius: 12, border: “1px solid “ + COLORS.creamDark, fontSize: 15, fontFamily: “‘DM Sans’, sans-serif”, boxSizing: “border-box” }} />
</div>
<div style={{ marginBottom: 16 }}>
<label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: “block”, marginBottom: 6 }}>Phone</label>
<input type=“tel” value={phone} onChange={function(e) { setPhone(e.target.value); }} placeholder=”(555) 123-4567” style={{ width: “100%”, padding: “14px 16px”, borderRadius: 12, border: “1px solid “ + COLORS.creamDark, fontSize: 15, fontFamily: “‘DM Sans’, sans-serif”, boxSizing: “border-box” }} />
</div>
<button onClick={handleSave} style={{ width: “100%”, padding: 16, background: saved ? COLORS.green : COLORS.gold, color: COLORS.white, border: “none”, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: “pointer” }}>
{saved ? “\u2713 Saved!” : “Save Profile”}
</button>
</AnimatedMount>
</div>
);
}

function OnboardingScreen({ onComplete }) {
const [step, setStep] = useState(0);
const [name, setName] = useState(””);
const [email, setEmail] = useState(””);
const [phone, setPhone] = useState(””);

var slides = [
{ emoji: “\u{1F9FA}”, title: “Welcome to\nNoah & Juliet”, subtitle: “Premium Laundry Services”, desc: “Professional care for your wardrobe” },
{ emoji: “\u{1F4C5}”, title: “Easy\nScheduling”, subtitle: “Book in seconds”, desc: “Pick your service, date, and time” },
{ emoji: “\u{1F381}”, title: “Earn\nRewards”, subtitle: “Every 8th service is FREE”, desc: “Our loyalty program rewards you” },
];

if (step < 3) {
var sl = slides[step];
return (
<div style={{ minHeight: “100vh”, background: COLORS.cream, display: “flex”, flexDirection: “column”, fontFamily: “‘DM Sans’, sans-serif”, maxWidth: 480, margin: “0 auto” }}>
<div style={{ flex: 1, display: “flex”, flexDirection: “column”, justifyContent: “center”, padding: “40px 32px” }}>
<AnimatedMount key={step}>
<div style={{ textAlign: “center” }}>
<div style={{ width: 120, height: 120, borderRadius: 30, background: “linear-gradient(135deg, “ + COLORS.navy + “, “ + COLORS.navyMid + “)”, display: “flex”, alignItems: “center”, justifyContent: “center”, margin: “0 auto 32px”, fontSize: 56 }}>{sl.emoji}</div>
<h1 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, fontFamily: “‘Cormorant Garamond’, serif”, lineHeight: 1.1, margin: “0 0 8px”, whiteSpace: “pre-line” }}>{sl.title}</h1>
<div style={{ fontSize: 16, color: COLORS.gold, fontWeight: 600, marginBottom: 12 }}>{sl.subtitle}</div>
<p style={{ fontSize: 14, color: COLORS.slate, margin: 0 }}>{sl.desc}</p>
</div>
</AnimatedMount>
</div>
<div style={{ padding: “0 32px 48px” }}>
<div style={{ display: “flex”, justifyContent: “center”, gap: 8, marginBottom: 24 }}>
{[0, 1, 2].map(function(i) { return <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 4, background: i === step ? COLORS.gold : COLORS.creamDark }} />; })}
</div>
<button onClick={function() { setStep(step + 1); }} style={{ width: “100%”, padding: 16, background: COLORS.gold, color: COLORS.white, border: “none”, borderRadius: 14, fontSize: 16, fontWeight: 600, cursor: “pointer” }}>
{step === 2 ? “Get Started” : “Next”}
</button>
</div>
</div>
);
}

return (
<div style={{ minHeight: “100vh”, background: COLORS.cream, display: “flex”, flexDirection: “column”, fontFamily: “‘DM Sans’, sans-serif”, maxWidth: 480, margin: “0 auto” }}>
<div style={{ flex: 1, padding: “60px 32px” }}>
<AnimatedMount>
<div style={{ textAlign: “center”, marginBottom: 36 }}>
<div style={{ width: 56, height: 56, borderRadius: 16, background: “linear-gradient(135deg, “ + COLORS.gold + “, “ + COLORS.goldDark + “)”, display: “flex”, alignItems: “center”, justifyContent: “center”, margin: “0 auto 16px”, fontSize: 20, fontWeight: 700, color: COLORS.white, fontFamily: “‘Cormorant Garamond’, serif” }}>NJ</div>
<h2 style={{ fontSize: 26, fontWeight: 700, color: COLORS.navy, fontFamily: “‘Cormorant Garamond’, serif”, margin: “0 0 4px” }}>Create Your Account</h2>
<p style={{ fontSize: 14, color: COLORS.slate, margin: 0 }}>Join our premium laundry service</p>
</div>
<div style={{ marginBottom: 16 }}>
<label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: “block”, marginBottom: 6 }}>Full Name</label>
<input type=“text” value={name} onChange={function(e) { setName(e.target.value); }} placeholder=“Your name” style={{ width: “100%”, padding: “14px 16px”, borderRadius: 12, border: “1px solid “ + COLORS.creamDark, fontSize: 15, fontFamily: “‘DM Sans’, sans-serif”, boxSizing: “border-box” }} />
</div>
<div style={{ marginBottom: 16 }}>
<label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: “block”, marginBottom: 6 }}>Email</label>
<input type=“email” value={email} onChange={function(e) { setEmail(e.target.value); }} placeholder=“your@email.com” style={{ width: “100%”, padding: “14px 16px”, borderRadius: 12, border: “1px solid “ + COLORS.creamDark, fontSize: 15, fontFamily: “‘DM Sans’, sans-serif”, boxSizing: “border-box” }} />
</div>
<div style={{ marginBottom: 16 }}>
<label style={{ fontSize: 13, fontWeight: 600, color: COLORS.navy, display: “block”, marginBottom: 6 }}>Phone</label>
<input type=“tel” value={phone} onChange={function(e) { setPhone(e.target.value); }} placeholder=”(555) 123-4567” style={{ width: “100%”, padding: “14px 16px”, borderRadius: 12, border: “1px solid “ + COLORS.creamDark, fontSize: 15, fontFamily: “‘DM Sans’, sans-serif”, boxSizing: “border-box” }} />
</div>
<button onClick={function() { if (name.trim()) onComplete(name, email, phone); }} disabled={!name.trim()}
style={{ width: “100%”, padding: 16, marginTop: 12, background: name.trim() ? COLORS.gold : COLORS.creamDark, color: name.trim() ? COLORS.white : COLORS.slate, border: “none”, borderRadius: 14, fontSize: 16, fontWeight: 600, cursor: name.trim() ? “pointer” : “not-allowed” }}>
Create Account
</button>
</AnimatedMount>
</div>
</div>
);
}

function App() {
const [appData, setAppData] = useState(defaultAppData);
const [screen, setScreen] = useState(“home”);
const [loaded, setLoaded] = useState(false);
const [showOnboarding, setShowOnboarding] = useState(false);

useEffect(function() {
try {
var saved = localStorage.getItem(“njlaundry-data”);
if (saved) {
var parsed = JSON.parse(saved);
setAppData(parsed);
if (!parsed.currentUser) setShowOnboarding(true);
} else {
setShowOnboarding(true);
}
} catch(e) {
setShowOnboarding(true);
}
setLoaded(true);
}, []);

useEffect(function() {
if (!loaded) return;
try { localStorage.setItem(“njlaundry-data”, JSON.stringify(appData)); } catch(e) {}
}, [appData, loaded]);

var handleOnboard = function(name, email, phone) {
var user = { id: “user-” + Date.now(), name: name, email: email, phone: phone };
setAppData(function(prev) { return Object.assign({}, prev, { currentUser: user }); });
setShowOnboarding(false);
};

if (!loaded) {
return (
<div style={{ minHeight: “100vh”, background: COLORS.cream, display: “flex”, alignItems: “center”, justifyContent: “center” }}>
<div style={{ textAlign: “center”, animation: “pulse 1.5s ease-in-out infinite” }}>
<div style={{ fontSize: 48, marginBottom: 12 }}>{”\u{1F9FA}”}</div>
<div style={{ fontSize: 14, color: COLORS.slate }}>Loading…</div>
</div>
</div>
);
}

if (showOnboarding) return <OnboardingScreen onComplete={handleOnboard} />;

var screenTitles = { home: “”, schedule: “Schedule Service”, rewards: “Rewards”, payments: “Payments”, waiver: “Service Agreement”, history: “Order History”, profile: “Profile” };

return (
<div style={{ minHeight: “100vh”, background: COLORS.cream, fontFamily: “‘DM Sans’, sans-serif”, maxWidth: 480, margin: “0 auto”, position: “relative” }}>
<div style={{ padding: “16px 20px 12px”, display: “flex”, alignItems: “center”, justifyContent: “space-between”, position: “sticky”, top: 0, zIndex: 100, background: COLORS.cream, borderBottom: screen !== “home” ? “1px solid “ + COLORS.creamDark : “none” }}>
{screen !== “home” ? (
<button onClick={function() { setScreen(“home”); }} style={{ background: “none”, border: “none”, cursor: “pointer”, padding: 4 }}>
<Icon name="back" size={24} color={COLORS.navy} />
</button>
) : (
<div style={{ display: “flex”, alignItems: “center”, gap: 10 }}>
<div style={{ width: 36, height: 36, borderRadius: 10, background: “linear-gradient(135deg, “ + COLORS.gold + “, “ + COLORS.goldDark + “)”, display: “flex”, alignItems: “center”, justifyContent: “center”, fontSize: 16, fontWeight: 700, color: COLORS.white, fontFamily: “‘Cormorant Garamond’, serif” }}>NJ</div>
<div>
<div style={{ fontSize: 14, fontWeight: 700, color: COLORS.navy, fontFamily: “‘Cormorant Garamond’, serif”, lineHeight: 1.1 }}>Noah & Juliet</div>
<div style={{ fontSize: 10, color: COLORS.gold, letterSpacing: 1.5, textTransform: “uppercase” }}>Laundry Services</div>
</div>
</div>
)}
<span style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, fontFamily: “‘Cormorant Garamond’, serif” }}>{screenTitles[screen]}</span>
<button onClick={function() { setScreen(“profile”); }} style={{ background: “none”, border: “none”, cursor: “pointer”, padding: 4 }}>
<Icon name=“user” size={22} color={screen === “profile” ? COLORS.gold : COLORS.navy} />
</button>
</div>

```
  <div style={{ paddingTop: 8 }}>
    {screen === "home" && <HomeScreen appData={appData} setScreen={setScreen} setAppData={setAppData} />}
    {screen === "schedule" && <ScheduleScreen appData={appData} setAppData={setAppData} setScreen={setScreen} />}
    {screen === "rewards" && <RewardsScreen appData={appData} />}
    {screen === "payments" && <PaymentsScreen appData={appData} setAppData={setAppData} />}
    {screen === "waiver" && <WaiverScreen appData={appData} setAppData={setAppData} setScreen={setScreen} />}
    {screen === "history" && <HistoryScreen appData={appData} setAppData={setAppData} />}
    {screen === "profile" && <ProfileScreen appData={appData} setAppData={setAppData} />}
  </div>

  <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: COLORS.white, borderTop: "1px solid " + COLORS.creamDark, display: "flex", justifyContent: "space-around", padding: "8px 0 20px", zIndex: 100 }}>
    {[
      { id: "home", icon: "home", label: "Home" },
      { id: "schedule", icon: "calendar", label: "Schedule" },
      { id: "rewards", icon: "star", label: "Rewards" },
      { id: "payments", icon: "dollar", label: "Pay" },
      { id: "history", icon: "history", label: "History" },
    ].map(function(tab) {
      return (
        <button key={tab.id} onClick={function() { setScreen(tab.id); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <Icon name={tab.icon} size={20} color={screen === tab.id ? COLORS.gold : COLORS.slate} />
          <span style={{ fontSize: 10, fontWeight: 600, color: screen === tab.id ? COLORS.gold : COLORS.slate }}>{tab.label}</span>
        </button>
      );
    })}
  </div>
</div>
```

);
}
