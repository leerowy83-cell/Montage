import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, ChevronDown, Check, X, Star, Search, Menu, 
  ArrowRight, ArrowLeft, Plus, Minus, Trash2, Edit, Heart, Home as HomeIcon, 
  User, Settings, Mail, Phone, MapPin, Calendar, Clock, Eye, EyeOff, 
  ShoppingCart, Filter, Download, Upload, Globe, Loader2, AlertCircle, 
  CheckCircle, ExternalLink, Copy, MoreHorizontal, MoreVertical, Sun, 
  Moon, Bell, Send, Image, Zap 
} from 'lucide-react';
import { 
  BrowserRouter, Routes, Route, Link, useNavigate, useLocation 
} from 'react-router-dom';

// === Types ===
interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  postsCount: number;
  isFollowing?: boolean;
}

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  hasLiked: boolean;
  location?: string;
}

interface Story {
  id: string;
  username: string;
  avatar: string;
  media: string;
  viewed: boolean;
}

// === Mock Data ===
const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    username: 'alex_skywalker',
    fullName: 'Alex Sky',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    bio: '📸 Visual Storyteller | Digital Nomad ✈️\nExploring the hidden gems of the world.',
    followers: 1250,
    following: 450,
    postsCount: 124,
  },
  {
    id: 'u2',
    username: 'sarah_design',
    fullName: 'Sarah Miller',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bio: 'UI/UX Designer @ TechFlow | Art Enthusiast',
    followers: 8900,
    following: 210,
    postsCount: 56,
  }
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    username: 'sarah_design',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8bef99c1e?w=800',
    caption: 'Chasing sunsets in the mountains. 🏔️ #nature #adventure',
    likes: 1242,
    location: 'Swiss Alps',
    hasLiked: false,
    timestamp: '2h ago',
    comments: [
      { id: 'c1', username: 'john_doe', text: 'Stunning view!', timestamp: '1h ago', likes: 2 },
      { id: 'c2', username: 'mike_travels', text: 'Where exactly is this?', timestamp: '30m ago', likes: 0 }
    ]
  },
  {
    id: 'p2',
    userId: 'u1',
    username: 'alex_skywalker',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    imageUrl: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800',
    caption: 'Modern architecture is just different. 🏛️',
    likes: 856,
    location: 'San Francisco, CA',
    hasLiked: true,
    timestamp: '5h ago',
    comments: []
  },
  {
    id: 'p3',
    userId: 'u4',
    username: 'nature_lover',
    userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    caption: 'The forest whispers secrets if you listen closely. 🌲✨',
    likes: 2103,
    location: 'Pacific Northwest',
    hasLiked: false,
    timestamp: '8h ago',
    comments: [
      { id: 'c3', username: 'sarah_design', text: 'The lighting is perfect!', timestamp: '2h ago', likes: 12 }
    ]
  }
];

const INITIAL_STORIES: Story[] = [
  { id: 's1', username: 'Your Story', avatar: INITIAL_USERS[0].avatar, media: INITIAL_POSTS[0].imageUrl, viewed: false },
  { id: 's2', username: 'sarah_design', avatar: INITIAL_USERS[1].avatar, media: INITIAL_POSTS[1].imageUrl, viewed: false },
  { id: 's3', username: 'mike_travels', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', media: INITIAL_POSTS[2].imageUrl, viewed: false },
  { id: 's4', username: 'art_daily', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', media: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', viewed: false },
];

// === Utility Styling Components ===
const StoryBar = ({ onStoryClick }: { onStoryClick: (story: Story) => void }) => (
  <div className="flex bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 p-4 space-x-4 overflow-x-auto no-scrollbar lg:bg-transparent lg:border-none lg:px-0">
    {INITIAL_STORIES.map((story) => (
      <button 
        key={story.id} 
        onClick={() => onStoryClick(story)}
        className="flex flex-col items-center flex-shrink-0 space-y-1"
      >
        <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
          <div className="p-0.5 bg-white dark:bg-zinc-950 rounded-full">
            <Avatar className="w-14 h-14 md:w-16 md:h-16 border dark:border-zinc-800">
              <AvatarImage src={story.avatar} />
              <AvatarFallback>{story.username[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <span className="text-[10px] md:text-xs truncate w-14 md:w-16 text-center dark:text-zinc-400">{story.username}</span>
      </button>
    ))}
  </div>
);

const FeedItem = ({ post, onLike, onComment }: { post: Post, onLike: (id: string) => void, onComment: (id: string, text: string) => void }) => {
  const [commentText, setCommentText] = useState('');
  const [showHeart, setShowHeart] = useState(false);
  const lastTapRef = useRef<number>(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (!post.hasLiked) onLike(post.id);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
    lastTapRef.current = now;
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
      toast.success("Comment posted!");
    }
  };

  return (
    <Card className="mb-4 md:mb-8 border-none md:border md:border-zinc-200 dark:md:border-zinc-800 rounded-none sm:rounded-lg overflow-hidden dark:bg-zinc-950">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.userAvatar} />
            <AvatarFallback>{post.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold dark:text-zinc-100 leading-none">{post.username}</p>
            {post.location && <p className="text-[11px] text-zinc-500 mt-0.5">{post.location}</p>}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-5 h-5" /></Button>
      </div>

      <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-900 overflow-hidden group w-full" onClick={handleDoubleTap}>
        <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover select-none" />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-300 pointer-events-none">
            <Heart className="w-20 h-20 md:w-24 md:h-24 text-white fill-white drop-shadow-lg" />
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button onClick={() => onLike(post.id)} className="hover:opacity-60 transition-opacity">
              <Heart className={cn("w-6 h-6", post.hasLiked ? "fill-red-500 text-red-500" : "dark:text-zinc-100")} />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="hover:opacity-60 transition-opacity"><Mail className="w-6 h-6 dark:text-zinc-100" /></button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader><DialogTitle>Comments</DialogTitle></DialogHeader>
                <ScrollArea className="h-[300px] md:h-[400px] pr-4">
                  {post.comments.length > 0 ? (
                    post.comments.map(c => (
                      <div key={c.id} className="flex gap-3 mb-4">
                        <Avatar className="w-8 h-8 flex-shrink-0"><AvatarFallback>{c.username[0]}</AvatarFallback></Avatar>
                        <div>
                          <p className="text-sm dark:text-zinc-200"><span className="font-bold mr-2">{c.username}</span>{c.text}</p>
                          <p className="text-xs text-zinc-500 mt-1">{c.timestamp}</p>
                        </div>
                      </div>
                    ))
                  ) : <div className="text-center text-zinc-500 py-10">No comments yet.</div>}
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <button className="hover:opacity-60 transition-opacity"><Send className="w-6 h-6 dark:text-zinc-100" /></button>
          </div>
          <button className="hover:opacity-60 transition-opacity flex">
            <Zap className="w-6 h-6 dark:text-zinc-100" />
          </button>
        </div>

        <p className="font-bold text-sm mb-1 dark:text-zinc-100">{post.likes.toLocaleString()} likes</p>
        <p className="text-sm dark:text-zinc-200">
          <span className="font-bold mr-2">{post.username}</span>
          {post.caption}
        </p>

        {post.comments.length > 0 && (
          <button className="text-zinc-500 text-sm mt-1.5 hover:underline" onClick={() => {}}>
            View all {post.comments.length} comments
          </button>
        )}
        <p className="text-[10px] uppercase text-zinc-500 mt-2 tracking-wide font-medium">{post.timestamp}</p>
      </div>

      <form onSubmit={submitComment} className="border-t dark:border-zinc-800 p-3 hidden md:flex gap-4 items-center">
        <Input 
          className="flex-1 bg-transparent border-none focus-visible:ring-0 text-sm p-0 h-auto dark:text-zinc-100 placeholder:text-zinc-400" 
          placeholder="Add a comment..." 
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button 
          type="submit" 
          variant="ghost" 
          disabled={!commentText.trim()} 
          className="text-blue-500 font-semibold p-0 h-auto hover:bg-transparent disabled:opacity-30"
        >
          Post
        </Button>
      </form>
    </Card>
  );
};

// === Main App Component ===
export default function GramFlow() {
  const [view, setView] = useState<'home' | 'search' | 'create' | 'reels' | 'shop' | 'profile'>('home');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [user, setUser] = useState<User>(INITIAL_USERS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [newPostCaption, setNewPostCaption] = useState('');

  const navigateTo = (newView: typeof view) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          hasLiked: !p.hasLiked,
          likes: p.hasLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, {
            id: Math.random().toString(),
            username: user.username,
            text,
            timestamp: 'Just now',
            likes: 0
          }]
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadPreview) return;
    
    const newPost: Post = {
      id: Math.random().toString(),
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      imageUrl: uploadPreview,
      caption: newPostCaption,
      likes: 0,
      hasLiked: false,
      timestamp: 'Just now',
      comments: []
    };

    setPosts([newPost, ...posts]);
    setUser(prev => ({ ...prev, postsCount: prev.postsCount + 1 }));
    navigateTo('home');
    setUploadPreview(null);
    setNewPostCaption('');
    toast.success("Post shared successfully!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // === Views ===

  const HomeView = () => (
    <div className="max-w-full overflow-x-hidden md:max-w-2xl mx-auto flex flex-col items-center pb-20">
      <div className="w-full max-w-xl">
        <StoryBar onStoryClick={setActiveStory} />
        <div className="py-0 md:py-4 w-full">
          {posts.map(post => (
            <FeedItem key={post.id} post={post} onLike={handleLike} onComment={handleAddComment} />
          ))}
        </div>
      </div>
    </div>
  );

  const SearchView = () => {
    const filteredPosts = posts.filter(p => 
      p.caption.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
      <div className="max-w-5xl mx-auto px-1 md:px-4 py-4 mb-20">
        <div className="relative mb-6 px-3 md:px-0">
          <Search className="absolute left-6 md:left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <Input 
            className="pl-10 bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg h-10" 
            placeholder="Search posts, people, tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-[1px] md:gap-4">
          {[...filteredPosts, ...posts, ...posts].map((post, idx) => (
            <div key={`${post.id}-${idx}`} className="aspect-square bg-zinc-200 dark:bg-zinc-800 relative group cursor-pointer overflow-hidden rounded-none md:rounded-sm">
              <img src={post.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 opacity-0 md:group-hover:opacity-100 flex items-center justify-center text-white gap-2 md:gap-4 transition-opacity">
                <div className="flex items-center gap-1 font-bold text-xs md:text-base"><Heart className="w-4 h-4 md:w-5 md:h-5 fill-white" /> {post.likes}</div>
                <div className="flex items-center gap-1 font-bold text-xs md:text-base"><Mail className="w-4 h-4 md:w-5 md:h-5 fill-white" /> {post.comments.length}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CreateView = () => (
    <div className="max-w-lg mx-auto px-4 py-4 md:py-8 mb-20">
      <Card className="dark:bg-zinc-950 dark:border-zinc-800 shadow-xl overflow-hidden">
        <CardHeader className="border-b dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <button onClick={() => navigateTo('home')} className="text-zinc-500"><X className="w-6 h-6" /></button>
            <CardTitle className="text-lg">Create New Post</CardTitle>
            <Button variant="ghost" className="text-blue-500 font-bold" onClick={handleCreatePost} disabled={!uploadPreview}>Share</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div 
              className="aspect-square w-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center relative cursor-pointer group"
              onClick={() => document.getElementById('post-upload')?.click()}
            >
              {uploadPreview ? (
                <img src={uploadPreview} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                    <Image className="w-8 h-8 text-zinc-400" />
                  </div>
                  <p className="text-sm font-medium">Click to select photos</p>
                </div>
              )}
              <input type="file" id="post-upload" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} />
                </Avatar>
                <span className="font-semibold text-sm">{user.username}</span>
              </div>
              <Textarea 
                placeholder="Write a caption..." 
                value={newPostCaption}
                onChange={(e) => setNewPostCaption(e.target.value)}
                className="flex-1 resize-none border-none focus-visible:ring-0 p-0 text-sm h-32 md:h-full bg-transparent"
              />
              <Separator />
              <div className="flex items-center justify-between text-sm py-1 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded px-1">
                <span>Add location</span> <MapPin className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="flex items-center justify-between text-sm py-1 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded px-1">
                <span>Accessibility</span> <ChevronDown className="w-4 h-4 text-zinc-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ReelsView = () => (
    <div className="w-full h-screen bg-black flex flex-col overflow-y-auto snap-y snap-mandatory mb-14 md:mb-0">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-full w-full snap-start relative flex items-center justify-center flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />
          <img 
            src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=800&auto=format&fit=crop`} 
            className="w-full h-full object-cover" 
            alt="Reel content"
          />
          <div className="absolute bottom-6 left-4 right-16 z-20 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="w-8 h-8 border border-white">
                <AvatarImage src={INITIAL_USERS[1].avatar} />
              </Avatar>
              <span className="font-bold text-sm">sarah_design</span>
              <Button variant="outline" size="sm" className="h-7 text-xs bg-white/10 border-white text-white">Follow</Button>
            </div>
            <p className="text-sm line-clamp-2">Exploring the world one pixel at a time... #motion #reels #vibes</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="p-1 bg-white/20 rounded flex items-center gap-1 text-[10px]">
                <Clock className="w-3 h-3" /> Original Audio
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 right-4 z-20 flex flex-col items-center gap-6 text-white">
            <div className="flex flex-col items-center">
              <Heart className="w-7 h-7" />
              <span className="text-xs mt-1">24.5k</span>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-7 h-7" />
              <span className="text-xs mt-1">102</span>
            </div>
            <div className="flex flex-col items-center">
              <Send className="w-7 h-7" />
            </div>
            <MoreVertical className="w-6 h-6" />
            <div className="w-8 h-8 rounded bg-white/20 border-2 border-white animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );

  const ShopView = () => (
    <div className="max-w-5xl mx-auto px-4 py-4 mb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Shop</h1>
        <div className="flex gap-4">
          <Download className="w-6 h-6" />
          <Menu className="w-6 h-6" />
        </div>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
        <Input className="pl-10 bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg h-9" placeholder="Search shops" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-between">
          <span className="font-bold">Shops</span>
          <ChevronRight className="w-5 h-5 text-zinc-400" />
        </div>
        <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-between">
          <span className="font-bold">Editors' Picks</span>
          <ChevronRight className="w-5 h-5 text-zinc-400" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="aspect-square bg-zinc-100 dark:bg-zinc-800 relative group overflow-hidden md:rounded-lg">
            <img src={`https://images.unsplash.com/photo-${1600000000000 + i}?w=400&fit=crop`} className="w-full h-full object-cover" alt="Product" />
            <div className="absolute bottom-2 left-2 right-2 bg-black/40 backdrop-blur-sm p-2 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs font-bold truncate">Premium Item #{i}</p>
              <p className="text-[10px]">$49.99</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="max-w-4xl mx-auto py-4 md:py-8 px-4 mb-20">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-8 md:mb-12">
        <div className="relative group">
          <Avatar className="w-24 h-24 md:w-36 md:h-36 border-2 border-zinc-100 dark:border-zinc-800 shadow-inner">
            <AvatarImage src={user.avatar} className="object-cover" />
            <AvatarFallback>{user.username[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
            <Plus className="text-white w-8 h-8" />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <h1 className="text-xl font-medium dark:text-zinc-100">{user.username}</h1>
            <div className="flex gap-2 justify-center md:justify-start">
              <Button size="sm" variant="secondary" className="font-semibold px-4">Edit Profile</Button>
              <Button size="sm" variant="secondary" className="px-2 aspect-square"><Settings className="w-4 h-4" /></Button>
            </div>
          </div>
          
          <div className="flex justify-around md:justify-start md:gap-10 border-y md:border-none py-3 md:py-0 mb-6 border-zinc-100 dark:border-zinc-900">
            <div className="flex flex-col md:flex-row gap-1 items-center">
              <span className="font-bold dark:text-zinc-100">{user.postsCount}</span>
              <span className="text-xs md:text-sm text-zinc-500">posts</span>
            </div>
            <div className="flex flex-col md:flex-row gap-1 items-center">
              <span className="font-bold dark:text-zinc-100">{user.followers.toLocaleString()}</span>
              <span className="text-xs md:text-sm text-zinc-500">followers</span>
            </div>
            <div className="flex flex-col md:flex-row gap-1 items-center">
              <span className="font-bold dark:text-zinc-100">{user.following.toLocaleString()}</span>
              <span className="text-xs md:text-sm text-zinc-500">following</span>
            </div>
          </div>
          
          <div className="text-left px-2 md:px-0">
            <p className="font-bold text-sm dark:text-zinc-100">{user.fullName}</p>
            <p className="text-sm whitespace-pre-line leading-relaxed dark:text-zinc-300">{user.bio}</p>
          </div>
        </div>
      </div>

      <Separator className="mb-2 md:mb-8 dark:bg-zinc-900" />
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full justify-around bg-transparent border-none p-0 h-11">
          <TabsTrigger value="posts" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-zinc-900 dark:data-[state=active]:border-zinc-100 bg-transparent shadow-none">
            <Image className="w-5 h-5" />
          </TabsTrigger>
          <TabsTrigger value="reels" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-zinc-900 dark:data-[state=active]:border-zinc-100 bg-transparent shadow-none">
            <Zap className="w-5 h-5" />
          </TabsTrigger>
          <TabsTrigger value="tagged" className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-zinc-900 dark:data-[state=active]:border-zinc-100 bg-transparent shadow-none">
            <User className="w-5 h-5" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-2">
          <div className="grid grid-cols-3 gap-1 md:gap-4 lg:gap-8">
            {posts.filter(p => p.userId === user.id).map((post, idx) => (
              <div key={`${post.id}-${idx}`} className="aspect-square bg-zinc-200 dark:bg-zinc-800 relative group cursor-pointer overflow-hidden">
                <img src={post.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reels" className="mt-2 text-center py-20">
          <Zap className="w-12 h-12 opacity-10 mx-auto" />
          <p className="text-zinc-500 mt-2">No reels yet</p>
        </TabsContent>
        <TabsContent value="tagged" className="mt-2 text-center py-20">
          <User className="w-12 h-12 opacity-10 mx-auto" />
          <p className="text-zinc-500 mt-2">Photos of you</p>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className={cn("min-h-screen flex flex-col", isDarkMode ? "dark bg-zinc-950 text-zinc-50" : "bg-white text-zinc-900")}>
      {/* Header */}
      <nav className="sticky top-0 z-[60] bg-white dark:bg-zinc-950 border-b dark:border-zinc-800 h-14 md:h-16 flex items-center px-4 w-full">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <h1 
            className="text-xl md:text-2xl font-bold font-serif tracking-tight cursor-pointer italic"
            onClick={() => navigateTo('home')}
          >
            GramFlow
          </h1>
          
          <div className="hidden md:flex relative flex-1 max-w-[250px] mx-8">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
            <Input 
              className="pl-9 py-1 h-9 bg-zinc-100 dark:bg-zinc-900 border-none rounded-md" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <Bell className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity" onClick={() => toast("Notifications cleared")} />
            <Send className="w-6 h-6 md:hidden cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-1 w-full min-h-screen">
        {view === 'home' && <HomeView />}
        {view === 'search' && <SearchView />}
        {view === 'create' && <CreateView />}
        {view === 'reels' && <ReelsView />}
        {view === 'shop' && <ShopView />}
        {view === 'profile' && <ProfileView />}
      </main>

      {/* Navigation - Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t dark:border-zinc-800 z-[70] h-14 flex items-center justify-around px-2">
        <button onClick={() => navigateTo('home')} className={cn("p-2", view === 'home' ? "text-zinc-900 dark:text-white" : "text-zinc-400")}>
          <HomeIcon className={cn("w-6 h-6", view === 'home' && "fill-current")} />
        </button>
        <button onClick={() => navigateTo('search')} className={cn("p-2", view === 'search' ? "text-zinc-900 dark:text-white" : "text-zinc-400")}>
          <Search className={cn("w-6 h-6", view === 'search' && "stroke-[3px]")} />
        </button>
        <button onClick={() => navigateTo('reels')} className={cn("p-2", view === 'reels' ? "text-zinc-900 dark:text-white" : "text-zinc-400")}>
          <Zap className={cn("w-6 h-6", view === 'reels' && "fill-current")} />
        </button>
        <button onClick={() => navigateTo('shop')} className={cn("p-2", view === 'shop' ? "text-zinc-900 dark:text-white" : "text-zinc-400")}>
          <ShoppingCart className={cn("w-6 h-6", view === 'shop' && "fill-current")} />
        </button>
        <button onClick={() => navigateTo('profile')} className="p-1">
          <Avatar className={cn("w-7 h-7 border", view === 'profile' ? "border-zinc-900 dark:border-white" : "border-transparent")}>
            <AvatarImage src={user.avatar} className="object-cover" />
          </Avatar>
        </button>
      </div>

      {/* Stories Overlay */}
      {activeStory && (
        <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="absolute top-2 left-2 right-2 flex gap-1 z-[110]">
             <div className="h-0.5 flex-1 bg-zinc-600 rounded overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-[6000ms] linear w-0" 
                  style={{ width: activeStory ? '100%': '0%' }}
                  onTransitionEnd={() => setActiveStory(null)} 
                />
             </div>
          </div>
          
          <div className="absolute top-6 left-4 flex items-center gap-3 z-[110]">
            <Avatar className="w-8 h-8 ring-2 ring-red-500">
              <AvatarImage src={activeStory.avatar} />
            </Avatar>
            <span className="text-white font-bold text-sm">{activeStory.username}</span>
          </div>
          
          <button className="absolute top-6 right-4 z-[110] text-white" onClick={() => setActiveStory(null)}>
            <X className="w-8 h-8" />
          </button>
          
          <img src={activeStory.media} className="h-full w-full object-contain bg-black" alt="Story" />
          
          <div className="absolute bottom-6 left-0 right-0 px-6 flex gap-4 max-w-lg mx-auto z-[110]">
             <Input 
                className="bg-zinc-900/50 border-white/20 text-white rounded-full h-11" 
                placeholder={`Reply to ${activeStory.username}...`} 
             />
             <Heart className="w-7 h-7 text-white mt-2" />
             <Send className="w-7 h-7 text-white mt-2" />
          </div>
        </div>
      )}

      {/* Global CSS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes progress-story {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}