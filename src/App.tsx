import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  ShieldCheck, 
  TrendingUp, 
  Activity,
  ArrowRight,
  Zap,
  Info,
  Layers,
  ChevronRight,
  Trophy,
  ShieldAlert,
  Gift,
  Bot,
  Send,
  User,
  Settings2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import Markdown from 'markdown-to-jsx';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Slider } from './components/ui/slider';
import { Button } from './components/ui/button';

// --- Animated Logo Component ---
const LOGO_GIF = 'https://qoatlegrzpgpkxpg.public.blob.vercel-storage.com/ezgif-55e853641876a7b8.gif';

function AnimatedLogo({ size = 32 }: { size?: number }) {
  return (
    <img
      src={LOGO_GIF}
      alt="Concrete Hub Logo"
      width={size}
      height={size}
      className="rounded-md object-contain"
      draggable={false}
    />
  );
}

function AnimatedBotLogo({ size = 28 }: { size?: number }) {
  return (
    <img
      src={LOGO_GIF}
      alt="Bot Engine Logo"
      width={size}
      height={size}
      className="rounded-full object-contain"
      draggable={false}
    />
  );
}

// AI Configuration Context
const BOT_SYSTEM_PROMPT = `You are the Official Concrete FAQ Bot. You are a helpful, concise AI.

YOUR PRIMARY DIRECTIVE:
You must ONLY answer questions about the Concrete protocol, Blueprint Finance, and the official Discord rules, roles, and community guidelines provided below. 
If a user asks about ANYTHING ELSE (e.g., general crypto advice, other protocols, off-topic subjects like cooking or sports), you MUST politely refuse and state that you can only discuss Concrete and its community.

CONCRETE & BLUEPRINT FINANCE CONTEXT:
- Concrete is an appchain and on-chain yield infrastructure platform.
- Blueprint Finance powers liquidations protection.
- Concrete protects CDPs from volatile liquidations by injecting just-in-time liquidity.

DISCORD REWARDS & GRINDING ("BAGS" & Roles):
Here's what users need to know about earning Roles and BAGS:

Role Rewards (Cumulative milestones):
- Role Level 5: Earn 50 BAGS
- Role Level 10: Earn 150 BAGS
- Role Level 17: Earn 250 BAGS
- Role Level 25: Earn 1000 BAGS

Once you reach the required badge level, rewards are distributed automatically. All you need to do is visit the website to claim your bags.

Other Roles:
- **Access Role**: Requires nomination from current holders and an assessment from the team.
- **Moais Role**: Strictly granted by the team directly.

Weekly Topics & Engagement:
- Weekly topic posts can help users earn around 400 BAGS per week.

Important Channel Links:
- Check ranking: <#1443617851926908988>
- Check weekly topics: <#1382107811508391987>
- Report suspicious people: <#1382107970070118570>

Other ways to contribute:
1. You can create arts, crafts, which can be a plus point in your contribution.
2. You can report suspicious people in the dedicated channel.
3. You can contribute by making a website, spreading awareness about Concrete's use cases, or similar value-add activities.

FORMATTING: Use bolding and concise bullet points when helpful. Never break character.`;
export default function App() {
  const [activeTab, setActiveTab] = useState('points');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <AnimatedLogo size={32} />
            <span className="font-semibold text-lg tracking-tight">Concrete Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden sm:flex border-primary/20 hover:bg-primary/10">
              <Activity className="mr-2 h-4 w-4" />
              Network Status: Live
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro */}
        <section className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Zap className="mr-1 h-3.5 w-3.5" />
            Ecosystem Strategy Tools
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Optimize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Concrete</span> position.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Simulate your Points Campaign strategies and visualize Blueprint Finance's liquidation protection. A community-built toolset.
          </p>
        </section>

        {/* Dashboard Tools */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-[600px] mb-8 bg-card border border-border">
            <TabsTrigger value="points" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calculator className="w-4 h-4 mr-2 hidden sm:block" />
              Points & Yield
            </TabsTrigger>
            <TabsTrigger value="protection" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShieldCheck className="w-4 h-4 mr-2 hidden sm:block" />
              Protection
            </TabsTrigger>
            <TabsTrigger value="bot" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 bg-primary/10">
              <Bot className="w-4 h-4 mr-2 text-primary" />
              Ask June Bot
            </TabsTrigger>
          </TabsList>

         <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="points" className="mt-0">
                <PointsCalculatorTab />
              </TabsContent>
              <TabsContent value="protection" className="mt-0">
                <ProtectionVisualizerTab />
              </TabsContent>
              <TabsContent value="bot" className="mt-0">
                <BotTab />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/40 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>Built for the Concrete community.</p>
          <div className="flex gap-4">
            <a href="https://app.concrete.xyz" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:underline underline-offset-4">App</a>
            <a href="https://points.concrete.xyz" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:underline underline-offset-4">Points Campaign</a>
            <a href="https://docs.concrete.xyz" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors hover:underline underline-offset-4">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Tab: Points & Yield Calculator ---
function PointsCalculatorTab() {
  const [deposit, setDeposit] = useState(10000);
  const [duration, setDuration] = useState(30);
  const [referrals, setReferrals] = useState(2);

  // Mock calculation logic for points
  // Base points: 10 per day per $1000
  const basePoints = (deposit / 1000) * 10 * duration;
  const referralMultiplier = 1 + (referrals * 0.05); // 5% boost per referral
  const totalPoints = Math.floor(basePoints * referralMultiplier);

  // Graph data prediction over time
  const chartData = useMemo(() => {
    const data = [];
    let currentPoints = 0;
    for (let day = 0; day <= duration; day += Math.max(1, Math.floor(duration / 10))) {
      currentPoints = ((deposit / 1000) * 10 * day) * referralMultiplier;
      data.push({
        name: `Day ${day}`,
        points: Math.floor(currentPoints),
        yield: (deposit * (0.08 / 365) * day).toFixed(2), // 8% base APY assumed
      });
    }
    return data;
  }, [deposit, duration, referrals, referralMultiplier]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Controls Sidebar */}
      <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Strategy Inputs
          </CardTitle>
          <CardDescription>Adjust your position to forecast returns.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">Deposit Size (USDC)</label>
              <span className="text-sm font-mono bg-secondary px-2 py-1 rounded text-secondary-foreground">${deposit.toLocaleString()}</span>
            </div>
            <Slider 
              value={[deposit]} 
              onValueChange={(val) => setDeposit(val[0])} 
              max={100000} 
              step={1000} 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">Duration (Days)</label>
              <span className="text-sm font-mono bg-secondary px-2 py-1 rounded text-secondary-foreground">{duration} Days</span>
            </div>
            <Slider 
              value={[duration]} 
              onValueChange={(val) => setDuration(val[0])} 
              max={365} 
              step={1} 
              min={1}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">Active Referrals</label>
              <span className="text-sm font-mono bg-secondary px-2 py-1 rounded text-secondary-foreground">{referrals} Users</span>
            </div>
            <Slider 
              value={[referrals]} 
              onValueChange={(val) => setReferrals(val[0])} 
              max={50} 
              step={1} 
            />
            <p className="text-xs text-muted-foreground flex items-center">
              <Info className="w-3 h-3 mr-1" />
              Each referral grants a 5% multiplier boost.
            </p>
          </div>

        </CardContent>
      </Card>

      {/* Main Results Data */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-card to-card/40 border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Layers className="w-24 h-24" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription>Projected Points</CardDescription>
              <CardTitle className="text-4xl font-bold font-mono text-primary flex items-baseline gap-2">
                {totalPoints.toLocaleString()}
                <span className="text-sm text-muted-foreground">pts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mt-2 flex items-center">
                Includes <span className="text-emerald-400 font-medium mx-1">+{(referrals * 5)}%</span> referral boost
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/40 border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <TrendingUp className="w-24 h-24" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription>Est. Protocol Yield (Earn V2)</CardDescription>
              <CardTitle className="text-4xl font-bold font-mono text-foreground flex items-baseline gap-2">
                ${((deposit * (0.08 / 365) * duration)).toFixed(2)}
                <span className="text-sm text-muted-foreground">USDC</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mt-2">
                Assumes base ~8.0% APY across vaults
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="bg-card/30 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Growth Trajectory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--color-muted-foreground)" 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)" 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--color-popover)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--color-foreground)' }}
                  />
                  <Area type="monotone" dataKey="points" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorPoints)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- Tab: Liquidation Protection Visualizer ---
function ProtectionVisualizerTab() {
  const [marketHealth, setMarketHealth] = useState(80); // 0 (crash) to 100 (bull)
  
  // Logic
  const collateralValue = 10000 * (marketHealth / 100);
  const debt = 6000;
  const healthFactor = collateralValue / debt;
  
  const isLiquidatedStandard = healthFactor < 1.05; // Standard DeFi Liquidation threshold
  // Concrete protection kicks in and prevents liquidation by automatically managing health
  const concreteHealthFactor = isLiquidatedStandard ? 1.10 : healthFactor; 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Simulation Engine */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Stress Test Your CDP</h2>
          <p className="text-muted-foreground">
            Move the slider to simulate a sudden market downturn. Watch how Concrete intercepts standard liquidations.
          </p>
        </div>

        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Market Condition</CardTitle>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                marketHealth > 70 ? 'bg-emerald-500/10 text-emerald-500' :
                marketHealth > 40 ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-red-500/10 text-red-500'
              }`}>
                ETH Price: ${(3500 * (marketHealth/100)).toFixed(0)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Slider 
              value={[marketHealth]} 
              onValueChange={(val) => setMarketHealth(val[0])} 
              max={100} 
              step={1} 
              min={10}
            />
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>Severe Crash</span>
              <span>Bull Market</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-border/50">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Debt Owed</p>
                <div className="text-xl font-mono text-foreground">${debt.toLocaleString()}</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Collateral Value</p>
                <div className="text-xl font-mono text-foreground">${collateralValue.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-primary/5 rounded-lg p-6 border border-primary/20 space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <ShieldCheck className="text-primary w-5 h-5" />
            How Concrete Works
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When your health factor approaches the danger zone, Concrete's Vaults automatically provide JIT (Just-In-Time) liquidity to temporarily boost your collateral, bypassing the violent gas-heavy liquidation engine, saving your principal.
          </p>
          <a href="https://docs.concrete.xyz" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm text-primary hover:underline group">
            Read Whitepaper <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Visualizer output */}
      <div className="space-y-6">
        
        {/* Standard Protocol */}
        <motion.div 
          animate={{
            scale: isLiquidatedStandard ? 0.98 : 1,
            opacity: isLiquidatedStandard ? 0.8 : 1,
          }}
          className={`relative rounded-xl border p-6 transition-all duration-500 ${
            isLiquidatedStandard ? 'bg-red-500/5 border-red-500/30' : 'bg-card/30 border-border/50'
          }`}
        >
          {isLiquidatedStandard && (
            <div className="absolute top-4 right-4 bg-red-500/20 text-red-500 text-xs font-bold px-2 py-1 rounded flex items-center animate-pulse">
              <Zap className="w-3 h-3 mr-1" /> LIQUIDATED
            </div>
          )}
          <h3 className="text-lg font-medium mb-4 flex items-center">
            Standard DeFi Protocol
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Health Factor</span>
                <span className={`font-mono ${isLiquidatedStandard ? 'text-red-500 font-bold' : 'text-foreground'}`}>
                  {healthFactor.toFixed(2)}
                </span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${isLiquidatedStandard ? 'bg-red-500' : 'bg-emerald-500'}`}
                  animate={{ width: `${Math.min(100, Math.max(0, healthFactor * 30))}%` }}
                />
              </div>
            </div>
            
            {isLiquidatedStandard ? (
              <div className="p-3 bg-red-500/10 rounded border border-red-500/20 text-sm text-red-400">
                Position seized by liquidators. -10% penalty applied.
              </div>
            ) : (
              <div className="p-3 bg-secondary/50 rounded border border-border text-sm text-muted-foreground">
                Position is currently safe.
              </div>
            )}
          </div>
        </motion.div>

        {/* Concrete Protected */}
        <motion.div 
          animate={{
            y: isLiquidatedStandard ? -10 : 0,
            boxShadow: isLiquidatedStandard ? '0 10px 40px -10px rgba(255, 255, 255, 0.1)' : 'none'
          }}
          className={`relative rounded-xl border p-6 transition-all duration-500 bg-card/60 backdrop-blur ${
            isLiquidatedStandard ? 'border-primary shadow-lg ring-1 ring-primary/50' : 'border-border'
          }`}
        >
          {isLiquidatedStandard && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded flex items-center shadow-md">
              <ShieldCheck className="w-3 h-3 mr-1" /> PROTECTED
            </div>
          )}
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            Concrete Appchain
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Effective Health Factor</span>
                <span className={`font-mono font-bold ${isLiquidatedStandard ? 'text-primary' : 'text-foreground'}`}>
                  {concreteHealthFactor.toFixed(2)}
                </span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-primary"
                  animate={{ width: `${Math.min(100, Math.max(0, concreteHealthFactor * 30))}%` }}
                />
                <div className="absolute top-0 bottom-0 border-l border-primary/50 w-px" style={{ left: '31.5%' }} title="Liquidation Threshold (1.05)" />
              </div>
            </div>
            
            {isLiquidatedStandard ? (
              <div className="p-3 bg-primary/10 rounded border border-primary/30 text-sm text-primary">
                Transient liquidity deployed from Concrete Vaults to boost health factor. Liquidation prevented.
              </div>
            ) : (
              <div className="p-3 bg-secondary/50 rounded border border-border text-sm text-muted-foreground">
                Blueprint Vaults standing by.
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// --- Tab: AI Bot Interface ---
type Message = { id: string; role: 'user' | 'assistant'; content: string; };

function BotTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I am the **Concrete FAQ Bot** powered by the **June/Blockchain** engine. \n\nI'm loaded with the official guidelines about the Concrete Protocol, Discord Roles, and BAGS rewards.\n\nHow can I help you?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [juneKey, setJuneKey] = useState(localStorage.getItem('ask_june_key') || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSaveConfig = () => {
    localStorage.setItem('ask_june_key', juneKey);
    setShowConfig(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Add thinking placeholder
      const placeholderId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: placeholderId, role: 'assistant', content: '...' }]);

      // Format previous messages for the model
      const history = messages.filter(m => m.id !== 'welcome').map(m => ({
        role: m.role,
        content: m.content
      }));

      // Call the Vercel Serverless Function
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          history,
          message: userMessage.content
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await res.json();
      const reply = data.reply || "I'm sorry, I couldn't generate a response.";

      setMessages(prev => 
        prev.map(m => m.id === placeholderId ? { ...m, content: reply } : m)
      );
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages(prev => {
        const lastMsgId = prev[prev.length - 1].id;
        return prev.map(m => m.id === lastMsgId ? { ...m, content: `⚠️ System error: ${error.message || "Failed to connect to the June engine."}` } : m);
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-h-[800px]">
      
      {/* Settings / Status Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="bg-card/30 border-border/50">
          <CardHeader className="pb-4 border-b border-border/20">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2"><Settings2 className="w-4 h-4 text-primary" /> Bot Engine</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary" onClick={() => setShowConfig(!showConfig)}>
                <Settings2 className="w-3 h-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {showConfig && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <CardContent className="pt-4 space-y-4 border-b border-border/20">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Engine Configuration</label>
                    <div className="text-sm px-3 py-2 bg-secondary/50 rounded border border-border/50 select-none">
                      Model: <span className="font-mono text-primary ml-1">blockchain/june</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Access Node</label>
                    <div className="text-sm px-3 py-2 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 select-none flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> Secure API Key Loaded (Backend)
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Loaded Context</label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-foreground/80 bg-secondary/30 p-2 rounded border border-border/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Blueprint Finance
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/80 bg-secondary/30 p-2 rounded border border-border/50">
                  <Trophy className="w-4 h-4 text-emerald-400" /> Discord Role Guides
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/80 bg-secondary/30 p-2 rounded border border-border/50">
                  <Gift className="w-4 h-4 text-emerald-400" /> BAGS Distribution Structure
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Area */}
      <Card className="lg:col-span-3 flex flex-col h-[600px] border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden">
        


        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border/40 bg-background/50">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
              <AnimatedBotLogo size={28} />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background"></div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground leading-tight">Concrete AI Assistant</h3>
            <p className="text-xs text-primary font-medium tracking-wide">Powered by Ask June</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={["flex gap-3", msg.role === 'user' ? 'flex-row-reverse' : ''].join(" ")}>
              <div className={["w-8 h-8 rounded-full flex items-center justify-center shrink-0", msg.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-primary/20 text-primary'].join(" ")}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={["max-w-[80%] rounded-2xl p-4", msg.role === 'user' ? 'bg-secondary text-secondary-foreground rounded-tr-sm' : 'bg-primary/10 text-foreground border border-primary/20 rounded-tl-sm'].join(" ")}>
                {msg.content === '...' ? (
                  <div className="flex items-center gap-1">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-primary/50" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-primary/60" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-primary/70" />
                  </div>
                ) : (
                  <div className="prose prose-sm prose-invert max-w-none">
                     <Markdown>{msg.content}</Markdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border/40 bg-background/30">
          <div className="relative flex items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Concrete roles, BAGS, or platform mechanics..."
              className="w-full bg-secondary/50 border border-input rounded-xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[50px] max-h-[120px] resize-none pb-12"
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-2 flex">
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading}
                size="icon" 
                className="h-8 w-8 bg-primary rounded-lg text-primary-foreground transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-2">
            AI can make mistakes. Always verify information using the <a href="https://docs.concrete.xyz" className="text-primary hover:underline">official docs</a>.
          </p>
        </div>
        
      </Card>

    </div>
  );
}
