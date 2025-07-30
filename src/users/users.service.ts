import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string,
  );

  async findByUsername(username: string) {
    const { data, error } = await this.supabase
      .from('guard_users')
      .select('*')
      .eq('username', username)
      .single();

    if (error) return null;
    return data;
  }

  async validatePassword(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (!user) return false;

    const match = await bcrypt.compare(password, user.password);
    return match ? user : false;
  }

  async createUser(username: string, password: string, role: string) {
    const existing = await this.findByUsername(username);
    
    if (existing) return { error: 'User already exists' };
    if (role != 'soldier' && role != 'commander') return { error: 'Role must be either "soldier" or "commander"' };

    const hash = await bcrypt.hash(password, 10);

    const { data, error } = await this.supabase.from('guard_users').insert([
      {
        username,
        password: hash,
        role,
      },
    ]);

    if (error) return { error: error.message };
    return data;
  }
}