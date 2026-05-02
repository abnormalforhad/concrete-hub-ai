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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { history, message } = req.body;

    const messages = [
      { role: 'system', content: BOT_SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message }
    ];

    const baseUrl = process.env.ASK_JUNE_BASE_URL || 'https://api.blockchain.info/ai/api/v1';
    const modelId = process.env.ASK_JUNE_MODEL || 'blockchain/june';

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ASK_JUNE_API_KEY || process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        model: modelId,
        messages: messages,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Ask June API Error (${response.status}):`, errorText);
      throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Unexpected API response structure');
    }
    const reply = data.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Error calling Ask June API:', error.message || error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
}
